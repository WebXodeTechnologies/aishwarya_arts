export const downloadCSV = (data) => {
  // 1. Define Headers as a clean array
  const headers = ["S.No", "Patron", "Email", "OrderID", "Artwork", "Amount", "Status", "Date"];
  
  // 2. Format Rows properly
  const rows = data.map(item => {
  // 1. Ensure amount is a string. If it's a number, convert it.
  const rawAmount = String(item.amount || "0");
  
  // 2. Remove EVERYTHING except numbers (No ₹, no commas, no dots)
  // This turns "₹42,646" into "42646"
  const cleanAmount = rawAmount.replace(/[^0-9]/g, "");

  return [
    item.sNo,
    `"${item.name}"`,
    item.email,
    item.orderId,
    `"${item.artwork}"`,
    cleanAmount, // 👈 This will now be 42646
    item.paymentStatus,
    item.date
  ].join(",");
});

  // 3. Construct the final CSV string
  const csvString = [headers.join(","), ...rows].join("\n");
  
  // 4. Create Blob with BOM (Byte Order Mark) for Excel compatibility (Fixes encoding issues)
  const blob = new Blob(["\ufeff" + csvString], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `Aishwarya_Arts_Sales_${new Date().toISOString().split('T')[0]}.csv`);
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Clean up
  window.URL.revokeObjectURL(url);
};

export const handlePrint = () => {
  window.print();
};

export const deleteOrder = async (orderId) => {
  try {
    const res = await fetch(`/api/admin/sales/${orderId}`, { method: 'DELETE' });
    return res.ok;
  } catch (error) {
    console.error("Delete Error:", error);
    return false;
  }
};