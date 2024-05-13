import React from 'react';
import '../styles/PageHeader.css';

function PageHeader({ title }) {
  return (
    /* tytuł strony, pod menu */
    <div className="page-header">
      <h1>{title}</h1> 
    </div>
  );
}

export default PageHeader;
