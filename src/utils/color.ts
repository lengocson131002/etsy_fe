export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const getStatusColor = (status?: string): string => {
  if (status?.toLowerCase() === 'active') {
    return '#37b24d';
  } else if (status?.toLowerCase() === 'vacation') {
    return '#fcc419';
  } else if (status?.toLowerCase() === 'suspended') {
    return '#e03131';
  } else {
    return randomColor();
  }
};

export const getOrderStatusColor = (status?: string): string => {
  if (status?.toLowerCase() === 'new') {
    return '#4dabf7';
  } else if (status?.toLowerCase() === 'fulfill') {
    return '#fcc419';
  } else if (status?.toLowerCase() === 'completed') {
    return '#37b24d';
  } else {
    return '#d6336c';
  }
};

export const getListingStatusColor = (status?: string): string => {
  if (status?.toLowerCase() === 'draft') {
    return '#495057';
  } else if (status?.toLowerCase() === 'active') {
    return '#37b24d';
  } else if (status?.toLowerCase() === 'sold_out') {
    return '#e03131';
  } else if (status?.toLowerCase() === 'vacation') {
    return '#fab005';
  } else if (status?.toLowerCase() === 'frozen') {
    return '#1c7ed6';
  } else if (status?.toLowerCase() === 'edit') {
    return '#ffd43b';
  } else if (status?.toLowerCase() === 'expired') {
    return '#f76707';
  } else {
    return '#d6336c';
  }
};
