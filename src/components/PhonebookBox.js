import React from 'react';
import { PhonebookItem } from './PhonebookItem';
import { PhonebookList } from './PhonebookList';
import { PhonebookTopBar } from './PhonebookTopBar';

export const PhonebookBox = () => {
  return (
    <div className="container">
      <PhonebookTopBar />
      <PhonebookList>
        <PhonebookItem avatar="" name='John Doe' phone='+1234567890' />
        <PhonebookItem avatar="" name='John Doe' phone='+1234567890' />
        <PhonebookItem avatar="" name='John Doe' phone='+1234567890' />
      </PhonebookList>
    </div>
  );
}