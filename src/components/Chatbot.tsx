import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Calendar, Clock, User, Mail, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface AppointmentData {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceType?: string;
  preferredDate?: string;
  preferredTime?: string;
  problemDescription?: string;
  appointmentStatus?: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! 👋 Welcome to A&S Engineering Services. How can I help you today? You can ask about our services or book an appointment with our engineers. For direct consultation, you can also reach us on WhatsApp at +91 7909455907.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'initial' | 'booking' | 'details'>('initial');
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleBookingFlow = async (userInput: string) => {
    const lowerInput = userInput.toLowerCase();

    if (step === 'initial') {
      if (lowerInput.includes('book') || lowerInput.includes('appointment') || lowerInput.includes('consult')) {
        addMessage(userInput, 'user');
        setStep('booking');
        addMessage(
          'Great! I\'d be happy to help you book an appointment. Let me collect some information.\n\nWhat\'s your full name?',
          'bot'
        );
        setInputValue('');
        return;
      } else if (lowerInput.includes('service') || lowerInput.includes('help')) {
        addMessage(userInput, 'user');
        addMessage(
          'We offer a range of engineering services including:\n\n• Consulting & Problem Analysis\n• System Design & Implementation\n• Technical Support & Troubleshooting\n• OEM Partnership Solutions\n\nWould you like to book an appointment to discuss your specific needs?',
          'bot'
        );
        setInputValue('');
        return;
      } else {
        addMessage(userInput, 'user');
        addMessage(
          'I can help you with:\n1. Information about our engineering services\n2. Booking an appointment with our engineers\n\nWhat would you like to do?',
          'bot'
        );
        setInputValue('');
        return;
      }
    }

    if (step === 'booking') {
      // Collect customer name
      if (!appointmentData.customerName) {
        addMessage(userInput, 'user');
        setAppointmentData({ ...appointmentData, customerName: userInput });
        addMessage('Nice to meet you! What\'s your email address?', 'bot');
        setInputValue('');
        return;
      }

      // Collect email
      if (!appointmentData.customerEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userInput)) {
          addMessage(userInput, 'user');
          addMessage('Please enter a valid email address.', 'bot');
          setInputValue('');
          return;
        }
        addMessage(userInput, 'user');
        setAppointmentData({ ...appointmentData, customerEmail: userInput });
        addMessage('Thank you! What\'s your phone number?', 'bot');
        setInputValue('');
        return;
      }

      // Collect phone
      if (!appointmentData.customerPhone) {
        addMessage(userInput, 'user');
        setAppointmentData({ ...appointmentData, customerPhone: userInput });
        addMessage(
          'What type of service are you interested in?\n\n1. Consulting & Problem Analysis\n2. System Design & Implementation\n3. Technical Support & Troubleshooting\n4. OEM Partnership Solutions\n\nPlease enter the number or service name.',
          'bot'
        );
        setInputValue('');
        return;
      }

      // Collect service type
      if (!appointmentData.serviceType) {
        const serviceMap: { [key: string]: string } = {
          '1': 'Consulting & Problem Analysis',
          '2': 'System Design & Implementation',
          '3': 'Technical Support & Troubleshooting',
          '4': 'OEM Partnership Solutions',
        };

        let serviceType = serviceMap[userInput.trim()] || userInput;
        addMessage(userInput, 'user');
        setAppointmentData({ ...appointmentData, serviceType });
        addMessage('What date would you prefer for your appointment? (e.g., 2026-04-15)', 'bot');
        setInputValue('');
        return;
      }

      // Collect date
      if (!appointmentData.preferredDate) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(userInput)) {
          addMessage(userInput, 'user');
          addMessage('Please enter a valid date in the format YYYY-MM-DD (e.g., 2026-04-15).', 'bot');
          setInputValue('');
          return;
        }
        addMessage(userInput, 'user');
        setAppointmentData({ ...appointmentData, preferredDate: userInput });
        addMessage('What time would you prefer? (e.g., 10:00 AM or 14:30)', 'bot');
        setInputValue('');
        return;
      }

      // Collect time
      if (!appointmentData.preferredTime) {
        addMessage(userInput, 'user');
        setAppointmentData({ ...appointmentData, preferredTime: userInput });
        addMessage(
          'Please describe the problem or issue you need help with. What challenges are you facing?',
          'bot'
        );
        setInputValue('');
        return;
      }

      // Collect problem description and save appointment
      if (!appointmentData.problemDescription) {
        addMessage(userInput, 'user');
        setIsLoading(true);

        try {
          const newAppointment = {
            _id: crypto.randomUUID(),
            customerName: appointmentData.customerName,
            customerEmail: appointmentData.customerEmail,
            customerPhone: appointmentData.customerPhone,
            serviceType: appointmentData.serviceType,
            preferredDate: appointmentData.preferredDate,
            preferredTime: appointmentData.preferredTime,
            problemDescription: userInput,
            appointmentStatus: 'Pending',
          };

          await BaseCrudService.create('appointments', newAppointment);

          addMessage(
            `Perfect! ✅ Your appointment has been booked successfully!\n\n📋 Appointment Summary:\n• Name: ${appointmentData.customerName}\n• Email: ${appointmentData.customerEmail}\n• Phone: ${appointmentData.customerPhone}\n• Service: ${appointmentData.serviceType}\n• Date: ${appointmentData.preferredDate}\n• Time: ${appointmentData.preferredTime}\n\nOur team will review your request and contact you shortly to confirm the appointment. Is there anything else I can help you with?`,
            'bot'
          );

          setAppointmentData({});
          setStep('initial');
        } catch (error) {
          addMessage(
            'Sorry, there was an error booking your appointment. Please try again or contact us directly.',
            'bot'
          );
        } finally {
          setIsLoading(false);
        }

        setInputValue('');
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    await handleBookingFlow(inputValue);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-secondary hover:bg-secondary/90 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg">A&S Engineering</h3>
              <p className="text-sm text-gray-200">Chat with our team</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-secondary text-white rounded-br-none'
                      : 'bg-white text-foreground border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-foreground border border-gray-200 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-secondary hover:bg-secondary/90 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
