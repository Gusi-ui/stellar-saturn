import type { APIRoute } from 'astro';
import { supabase, type RegistrationData } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return new Response(
        JSON.stringify({ 
          error: 'Por favor, completa todos los campos obligatorios',
          fields: ['fullName', 'email', 'phone']
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ 
          error: 'Por favor, introduce un email válido',
          fields: ['email']
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate phone format (Spanish mobile numbers)
    const phoneRegex = /^[67]\d{8}$/;
    if (!phoneRegex.test(data.phone)) {
      return new Response(
        JSON.stringify({ 
          error: 'Por favor, introduce un número de teléfono válido (9 dígitos)',
          fields: ['phone']
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate consent
    if (!data.consent) {
      return new Response(
        JSON.stringify({ 
          error: 'Debes aceptar la política de privacidad',
          fields: ['consent']
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Preparar datos para la base de datos
    const registrationData: RegistrationData = {
      full_name: data.fullName.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      functional_diversity: data.functionalDiversity || null,
      relationship: data.relationship,
      newsletter: data.newsletter || false,
      consent: data.consent
    };

    // Guardar en Supabase
    const { data: insertedData, error: dbError } = await supabase
      .from('registrations')
      .insert([registrationData])
      .select()
      .single();

    if (dbError) {
      console.error('Error al guardar en la base de datos:', dbError);
      
      // Verificar si es un error de duplicado (email ya existe)
      if (dbError.code === '23505') {
        return new Response(
          JSON.stringify({ 
            error: 'Ya existe una inscripción con este correo electrónico',
            fields: ['email']
          }), 
          { 
            status: 409,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          error: 'Error al procesar la inscripción. Por favor, inténtalo de nuevo más tarde.'
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Log exitoso (sin datos sensibles)
    console.log('Registro guardado exitosamente:', {
      id: insertedData.id,
      email: insertedData.email,
      timestamp: insertedData.created_at
    });

    // Aquí podrías agregar:
    // 1. Envío de email de confirmación (usando Resend, SendGrid, etc.)
    // 2. Notificación por WhatsApp
    // 3. Integración con Google Sheets si es necesario

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Inscripción recibida correctamente. Nos pondremos en contacto contigo pronto.',
        id: insertedData.id
      }), 
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );
    
  } catch (error) {
    console.error('Error processing registration:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error al procesar la inscripción. Por favor, inténtalo de nuevo más tarde.'
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Handle OPTIONS request for CORS
export const OPTIONS: APIRoute = () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};