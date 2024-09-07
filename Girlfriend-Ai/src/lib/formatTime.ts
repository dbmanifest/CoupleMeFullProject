// utils/dateUtils.ts
export const formatTime = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    
    // Check if the date is today
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      // Format as HH:MM
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    // Check if the date was yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    }
  
    // Format as MMM DD, YYYY
    return date.toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' });
  };
  