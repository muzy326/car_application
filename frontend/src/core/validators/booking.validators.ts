export interface BookingDateValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Shared booking date validation.
 * Used by both Manual Booking and DriveAI.
 */
export function validateBookingDates(
  startDate: Date | string | null | undefined,
  endDate: Date | string | null | undefined
): BookingDateValidationResult {

  if (!startDate) {
    return {
      valid: false,
      error: 'Start date is required.'
    };
  }

  if (!endDate) {
    return {
      valid: false,
      error: 'End date is required.'
    };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime())) {
    return {
      valid: false,
      error: 'Start date is invalid.'
    };
  }

  if (isNaN(end.getTime())) {
    return {
      valid: false,
      error: 'End date is invalid.'
    };
  }

  if (start >= end) {
    return {
      valid: false,
      error: 'End date must be after start date.'
    };
  }

  return {
    valid: true
  };
}