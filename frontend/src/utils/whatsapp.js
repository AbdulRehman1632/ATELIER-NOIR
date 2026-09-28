// WhatsApp Ordering and Concierge Helper

export const WHATSAPP_NUMBER = '15550192834'; // Default luxury concierge number

/**
 * Builds the structured WhatsApp pre-fill message for a direct product order
 */
export const buildWhatsAppOrderMessage = ({ product, color, size, quantity = 1, price, currentUrl }) => {
  const finalPrice = (price || product.discountedPrice || product.basePrice) * quantity;
  const url = currentUrl || window.location.href;

  const lines = [
    `⚜️ *ATELIER NOIR — DIRECT ORDER INQUIRY* ⚜️`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `*Jacket:* ${product.title}`,
    `*SKU:* ${product.sku}`,
    `*Color:* ${color?.name || color || 'Signature Atelier'}`,
    `*Size:* ${size}`,
    `*Quantity:* ${quantity}`,
    `*Unit Price:* $${price || product.discountedPrice || product.basePrice}`,
    `*Total Value:* $${finalPrice}`,
    `*Item Archive Link:* ${url}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `*Client Note:* Hello Atelier Concierge, I would like to reserve and finalize payment/tailoring for this jacket. Please advise on delivery.`
  ];

  return lines.join('\n');
};

/**
 * Builds the structured WhatsApp pre-fill message for entire shopping cart
 */
export const buildWhatsAppCartOrderMessage = ({ cartItems, totalAmount }) => {
  const itemsText = cartItems
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.title}*\n   • Color: ${item.color?.name || item.color}\n   • Size: ${item.size}\n   • Qty: ${item.quantity}\n   • Price: $${item.price * item.quantity} (SKU: ${item.sku})`
    )
    .join('\n\n');

  const lines = [
    `⚜️ *ATELIER NOIR — CART CONCIERGE ORDER* ⚜️`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `*Client Order Summary (${cartItems.length} items):*`,
    ``,
    itemsText,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `*Total Order Amount:* $${totalAmount}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `*Client Note:* Hello Atelier Concierge, I would like to finalize my cart order. Please confirm availability and guide me through white-glove dispatch.`
  ];

  return lines.join('\n');
};

/**
 * Launches WhatsApp Web/App with message and automatically logs the inquiry to backend
 */
export const openWhatsAppChat = async ({ message, orderData = null }) => {
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

  // Log order inquiry to backend asynchronously
  if (orderData) {
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderData,
          whatsappMessage: message,
          orderType: 'WhatsApp Direct'
        })
      }).catch(err => console.warn('Could not log WhatsApp order to API:', err));
    } catch (e) {
      // Non-blocking
    }
  }

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};
