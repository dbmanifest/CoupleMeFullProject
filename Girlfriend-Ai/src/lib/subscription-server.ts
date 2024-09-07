import { auth } from "@clerk/nextjs/server";
export const checkSubscription = async () => {
    // userID but for the server
    const { userId } = auth();
    if (!userId) {
      return false;
    }
  
    try {
      const response = await fetch('/api/subscription');
      const data = await response.json();
      return data.isSubscribed;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  };