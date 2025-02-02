import React, { useEffect, useRef } from "react";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      flatpickr(datePickerRef.current, {
        dateFormat: "d/m/Y", // Định dạng ngày dd/mm/yyyy
        defaultDate: value,
        onChange: (selectedDates, dateStr) => {
          onChange(dateStr); // Gửi ngày được chọn về component cha
        },
      });
    }
  }, [value]);

  return <input ref={datePickerRef} defaultValue={value} />;
};

export default DatePicker;
