import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';

const HotkeyManager = () => {
  const navigate = useNavigate();
  ///
  // Hotkey for Customer form (Alt + C)
  useHotkeys('alt+u', () => {
    navigate('/display');
  });

  // Hotkey for Product form (Alt + P)
  useHotkeys('alt+p', () => {
    navigate('/products');
  });

  // Hotkey for New Order form (Alt + N)
  useHotkeys('alt+i', () => {
    navigate('/invoices');
  });
  useHotkeys('alt+i', () => {
    navigate('/invoices');
  });
  useHotkeys('alt+c', () => {
    navigate('/deliverychallan-table');
  });
  useHotkeys('alt+q', () => {
    navigate('/quotation');
  });
  useHotkeys('alt+b', () => {
    navigate('/purchase');
  });
  useHotkeys('alt+o', () => {
    navigate('/paymentOut');
  });
  useHotkeys('alt+d', () => {
    navigate('/dashboard');
  });
  return null; // No UI, just managing hotkeys
};

export default HotkeyManager;
