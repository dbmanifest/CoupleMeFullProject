import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const DAY_IN_MS = 86_400_000;

export const useSubscription = () => {
  const { userId } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!userId) {
        setIsSubscribed(false);
        return;
      }

      try {
        const response = await fetch('/api/subscription');
        const data = await response.json();
        setIsSubscribed(data.isSubscribed);
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsSubscribed(false);
      }
    };

    checkSubscription();
  }, [userId]);

  return isSubscribed;
};

