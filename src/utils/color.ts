export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const getStatusColor = (status?: string): string => {
  if (status?.toLowerCase() === 'active') {
    return 'green';
  } else if (status?.toLowerCase() === 'vacation') {
    return 'gold';
  } else if (status?.toLowerCase() === 'suspended') {
    return 'red';
  } else {
    return 'purple';
  }
};

export const getOrderStatusColor = (status?: string): string => {
  if (status?.toLowerCase() === 'new') {
    return 'blue';
  } else if (status?.toLowerCase() === 'fulfill') {
    return 'orange';
  } else if (status?.toLowerCase() === 'completed') {
    return 'green';
  } else if (status?.toLowerCase() === 'trello') {
    return 'cyan';
  } else {
    return 'purple';
  }
};

export const getListingStatusColor = (status?: string): string => {
  if (status?.toLowerCase() === 'draft') {
    return 'lime';
  } else if (status?.toLowerCase() === 'active') {
    return 'green';
  } else if (status?.toLowerCase() === 'sold_out') {
    return 'red';
  } else if (status?.toLowerCase() === 'vacation') {
    return 'orange';
  } else if (status?.toLowerCase() === 'frozen') {
    return 'blue';
  } else if (status?.toLowerCase() === 'edit') {
    return 'gold';
  } else if (status?.toLowerCase() === 'expired') {
    return 'magenta';
  } else {
    return 'purple';
  }
};

export const getProfileStatusColor = (status?: string): string => {
  console.log(status?.toLowerCase());

  if (status?.toLowerCase() === 'logout') {
    return 'red';
  } else if (status?.toLowerCase() === 'deleted') {
    return 'orange';
  } else if (status?.toLowerCase() === 'empty'){
    return 'cyan'
  } else if (status?.toLowerCase() === 'sync') {
    return 'green'
  } else if (status?.toLowerCase() === 'toomanyrequest') {
    return 'blue'
  } else if (status?.toLowerCase() === 'failedproxy') {
    return 'volcano'
  } else {
    return 'purple';
  }
};
