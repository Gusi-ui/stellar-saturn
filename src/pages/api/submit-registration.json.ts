import type { APIRoute } from 'astro';

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

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to Google Sheets
    // 4. Send WhatsApp notification
    
    // For now, we'll simulate a successful submission
    console.log('Registration data received:', {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      functionalDiversity: data.functionalDiversity || 'No especificado',
      relationship: data.relationship,
      newsletter: data.newsletter || false,
      timestamp: new Date().toISOString()
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Inscripción recibida correctamente. Nos pondremos en contacto contigo pronto.'
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