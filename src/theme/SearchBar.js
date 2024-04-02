import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import AskCookbook from '@cookbookdev/docsbot/react'

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <AskCookbook
        apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjA2MmU5ZTVhYjBkODdjYTY1OGZkZjEiLCJpYXQiOjE3MTE2ODExODIsImV4cCI6MjAyNzI1NzE4Mn0.UPssPFo2urG3mH0TsU28tCtT7OWdqpG2dNJn3Ya9k2M"
        noFastMode
      />
    </>
  );
}
