
import { defineStore } from 'pinia';
export const useDateHelpers = defineStore('dateHelper', () => {
    const today = new Date();
  
    /**
     * Parse a date string in 'YYYY-MM-DD' format into a Date object
     * @param {string} dateStr - The date string to parse
     * @returns {Date} - The parsed Date object
     */
    const parseDate = (dateStr: any) => {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    };
  
    /**
     * Format a Date object into a 'YYYY-MM-DD' string
     * @param {Date} date - The date object to format
     * @returns {string} - The formatted date string
     */
    const formatDate = (date: any) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    return {
      today,
      parseDate,
      formatDate
    };
  })