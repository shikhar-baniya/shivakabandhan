import { useMutation } from "@tanstack/react-query";
import { api, type RsvpInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateRsvp() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: RsvpInput) => {
      // Validate data with Zod schema before sending if possible, 
      // but api.rsvps.create.input.parse(data) happens on server too.
      // We rely on the types here.
      
      const res = await fetch(api.rsvps.create.path, {
        method: api.rsvps.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        // Try to parse the specific validation error
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 400 && errorData.message) {
          throw new Error(errorData.message);
        }
        throw new Error("Failed to submit RSVP. Please try again.");
      }

      return api.rsvps.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Namaste!",
        description: "Your RSVP has been received with joy. We look forward to celebrating with you.",
        className: "bg-primary text-primary-foreground border-none font-serif",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
