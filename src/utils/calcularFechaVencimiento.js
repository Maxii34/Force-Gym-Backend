const calcularFechaVencimiento = (fechaBase, tipoMembresia) => {
  const nuevaFecha = new Date(fechaBase);

  switch (tipoMembresia) {
    case "mensual":
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
      return nuevaFecha;
    case "trimestral":
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 3);
      return nuevaFecha;
    case "semestral":
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 6);
      return nuevaFecha;
    case "anual":
      nuevaFecha.setFullYear(nuevaFecha.getFullYear() + 1);
      return nuevaFecha;
    default:
      return null;
  }
};

export default calcularFechaVencimiento;
