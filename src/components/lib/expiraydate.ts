export const expDate = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate.toLocaleDateString()
  }