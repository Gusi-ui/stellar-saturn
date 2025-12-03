import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Users, CheckCircle, AlertCircle } from 'lucide-react';

const registrationSchema = z.object({
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^[0-9]{9}$/, 'El teléfono debe tener 9 dígitos'),
  functionalDiversity: z.enum(['visual', 'auditory', 'motor', 'cognitive', 'other', 'none'], {
    errorMap: () => ({ message: 'Por favor, selecciona una opción' }),
  }),
  relationship: z.enum(['person', 'family', 'professional', 'volunteer'], {
    errorMap: () => ({ message: 'Por favor, selecciona una opción' }),
  }),
  consent: z.boolean().refine((val) => val === true, 'Debes aceptar la política de privacidad'),
  newsletter: z.boolean().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  onSuccess?: () => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-registration.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        onSuccess?.();

        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = '/gracias-por-inscribirte';
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-8 rounded-lg shadow-sm"
      >
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fullName"
                {...register('fullName')}
                className={`block w-full pl-10 pr-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Ingresa tu nombre completo"
                aria-invalid={errors.fullName ? 'true' : 'false'}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
            </div>
            {errors.fullName && (
              <p id="fullName-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="tu@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono de contacto (WhatsApp) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className={`block w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="600000000"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
            </div>
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Diversity Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Información sobre diversidad funcional
          </h3>

          {/* Functional Diversity */}
          <div>
            <label
              htmlFor="functionalDiversity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de diversidad funcional
            </label>
            <select
              id="functionalDiversity"
              {...register('functionalDiversity')}
              className={`block w-full px-3 py-2 border ${errors.functionalDiversity ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              aria-invalid={errors.functionalDiversity ? 'true' : 'false'}
              aria-describedby={
                errors.functionalDiversity ? 'functionalDiversity-error' : undefined
              }
            >
              <option value="">Selecciona una opción (opcional)</option>
              <option value="visual">Visual</option>
              <option value="auditory">Auditiva</option>
              <option value="motor">Motora</option>
              <option value="cognitive">Cognitiva</option>
              <option value="other">Otra</option>
              <option value="none">No tengo diversidad funcional</option>
            </select>
            {errors.functionalDiversity && (
              <p
                id="functionalDiversity-error"
                className="mt-1 text-sm text-red-600 flex items-center"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.functionalDiversity.message}
              </p>
            )}
          </div>

          {/* Relationship */}
          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
              ¿Cuál es tu relación con la asociación? *
            </label>
            <select
              id="relationship"
              {...register('relationship')}
              className={`block w-full px-3 py-2 border ${errors.relationship ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              aria-invalid={errors.relationship ? 'true' : 'false'}
              aria-describedby={errors.relationship ? 'relationship-error' : undefined}
            >
              <option value="">Selecciona una opción</option>
              <option value="person">Persona con diversidad funcional</option>
              <option value="family">Familiar o cuidador</option>
              <option value="professional">Profesional del sector</option>
              <option value="volunteer">Voluntario</option>
            </select>
            {errors.relationship && (
              <p id="relationship-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.relationship.message}
              </p>
            )}
          </div>
        </div>

        {/* Consent and Newsletter */}
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="consent"
                {...register('consent')}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                aria-invalid={errors.consent ? 'true' : 'false'}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="font-medium text-gray-700">
                Acepto la política de privacidad y el tratamiento de mis datos personales *
              </label>
              <p className="text-gray-500">
                Tus datos serán utilizados únicamente para gestionar tu inscripción y mantenerte
                informado sobre las actividades de la asociación.
              </p>
            </div>
          </div>
          {errors.consent && (
            <p id="consent-error" className="text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.consent.message}
            </p>
          )}

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="newsletter"
                {...register('newsletter')}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="newsletter" className="font-medium text-gray-700">
                Deseo recibir información sobre las actividades y noticias de la asociación
              </label>
            </div>
          </div>
        </div>

        {/* Submit Status */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">¡Inscripción enviada!</h3>
                <p className="text-sm text-green-700 mt-1">
                  Gracias por tu interés en nuestra asociación. Nos pondremos en contacto contigo
                  pronto.
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error al enviar</h3>
                <p className="text-sm text-red-700 mt-1">
                  Ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Enviando...
            </div>
          ) : (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Enviar inscripción
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
