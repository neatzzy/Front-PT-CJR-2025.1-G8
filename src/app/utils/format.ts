export function formatDate(date){
    return new Date(date)
      .toLocaleString('pt-BR',
        {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour12: false,
        }
      );
  };