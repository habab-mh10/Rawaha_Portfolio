import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

// =====================================================================
// SendModal — two modes:
//   mode="send"  → only 2 action buttons (used by Contact section)
//   mode="order" → full form + 2 action buttons (used by Header "Order Now")
// =====================================================================

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    fontFamily: "Syne",
    "& input": {
      fontFamily: "Syne",
      color: "var(--text-primary)",
    },
    "& fieldset": { borderColor: "var(--text-secondary)" },
    "&:hover fieldset": { borderColor: "var(--text-secondary)" },
    "&.Mui-focused fieldset": { borderColor: "var(--text-primary)" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Syne",
    color: "var(--text-secondary)",
    "&.Mui-focused": { color: "var(--text-secondary)" },
  },
};

const SendModal = ({
  isOpen,
  onClose,
  // --- mode="send" props (Contact form already filled) ---
  mode = "send",
  onWhatsApp,
  onEmail,
}) => {
  // =================== Scroll Lock ===================//
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // =================== Order Form State (mode="order") ===================//
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleOrderChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const resetOrderForm = () => {
    setOrderData({ name: "", email: "", subject: "", message: "" });
  };

  const handleOrderWhatsApp = () => {
    const whatsappMessage = `New Order Request

Name: ${orderData.name}
Email: ${orderData.email}
Subject: ${orderData.subject}

Message:
${orderData.message}`;

    const whatsappURL = `https://wa.me/923028053159?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");
    resetOrderForm();
    onClose();
  };

  const handleOrderEmail = () => {
    const mailtoURL = `mailto:muhammadrawaha15@gmail.com?subject=${encodeURIComponent(
      orderData.subject
    )}&body=${encodeURIComponent(
      `From: ${orderData.name} <${orderData.email}>\n\nMessage:\n${orderData.message}`
    )}`;
    window.open(mailtoURL, "_blank");
    resetOrderForm();
    onClose();
  };

  // Check if order form is filled
  const isOrderFormValid =
    orderData.name.trim() &&
    orderData.email.trim() &&
    orderData.subject.trim() &&
    orderData.message.trim();
  // =======================================================================//

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center px-4 py-6"
      style={{ zIndex: 99999 }}
    >
      {/* ===== Backdrop ===== */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ===== Modal Box ===== */}
      <div
        className="relative z-10 bg-[var(--card-bg)] border border-[var(--card-border)] w-full max-w-lg p-8 sm:p-10 font-syne shadow-2xl overflow-y-auto"
        style={{
          animation: "modalFadeIn 0.25s ease",
          maxHeight: "90vh",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* ============================================================ */}
        {/* MODE: send — just 2 action buttons                           */}
        {/* ============================================================ */}
        {mode === "send" && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              How would you like to send?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-8">
              Choose how you want to deliver your message.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onWhatsApp}
                className="flex-1 flex flex-col items-center gap-3 p-6
                  border border-[var(--card-border)]
                  hover:border-green-500 hover:bg-green-500/10
                  transition-all duration-300 group cursor-pointer"
              >
                <WhatsAppIcon
                  className="text-green-500 group-hover:scale-110 transition-transform duration-300"
                  sx={{ fontSize: 42 }}
                />
                <span className="text-[var(--text-primary)] font-semibold text-sm">
                  WhatsApp
                </span>
                <span className="text-[var(--text-secondary)] text-xs text-center leading-relaxed">
                  Send directly via WhatsApp
                </span>
              </button>

              <button
                onClick={onEmail}
                className="flex-1 flex flex-col items-center gap-3 p-6
                  border border-[var(--card-border)]
                  hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10
                  transition-all duration-300 group cursor-pointer"
              >
                <MailOutlineIcon
                  className="text-[var(--accent-primary)] group-hover:scale-110 transition-transform duration-300"
                  sx={{ fontSize: 42 }}
                />
                <span className="text-[var(--text-primary)] font-semibold text-sm">
                  Email
                </span>
                <span className="text-[var(--text-secondary)] text-xs text-center leading-relaxed">
                  Send directly via your email
                </span>
              </button>
            </div>
          </>
        )}

        {/* ============================================================ */}
        {/* MODE: order — full form + 2 action buttons                   */}
        {/* ============================================================ */}
        {mode === "order" && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              Place Your Order
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-8">
              Fill in the details and choose how you'd like to reach us.
            </p>

            {/* Form Fields */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <TextField
                  label="Your Name"
                  name="name"
                  value={orderData.name}
                  onChange={handleOrderChange}
                  required
                  fullWidth
                  sx={inputStyle}
                />
                <TextField
                  label="Your Email"
                  name="email"
                  type="email"
                  value={orderData.email}
                  onChange={handleOrderChange}
                  required
                  fullWidth
                  sx={inputStyle}
                />
              </div>

              <TextField
                label="Your Subject"
                name="subject"
                value={orderData.subject}
                onChange={handleOrderChange}
                required
                fullWidth
                sx={inputStyle}
              />

              <div className="relative w-full">
                <textarea
                  id="order-message"
                  name="message"
                  value={orderData.message}
                  onChange={handleOrderChange}
                  required
                  rows={4}
                  placeholder=" "
                  className="w-full peer rounded-md border border-[var(--text-secondary)] bg-transparent px-3 pt-5 pb-2 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] transition-all duration-200 font-syne outline-none"
                />
                <label
                  htmlFor="order-message"
                  className="absolute left-3 top-0 px-1 text-[var(--text-secondary)] text-sm bg-[var(--card-bg)] transition-all duration-200
                    peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                    peer-focus:-top-3 peer-focus:text-[0.8rem]"
                >
                  Describe Your Project *
                </label>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[var(--card-border)] my-8" />

            {/* Action Buttons */}
            <p className="text-[var(--text-secondary)] text-xs mb-4">
              Choose how you want to send your order:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOrderWhatsApp}
                disabled={!isOrderFormValid}
                className="flex-1 flex items-center justify-center gap-2 p-4
                  border border-[var(--card-border)]
                  hover:border-green-500 hover:bg-green-500/10
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-300 group cursor-pointer"
              >
                <WhatsAppIcon
                  className="text-green-500 group-hover:scale-110 transition-transform duration-300"
                  sx={{ fontSize: 22 }}
                />
                <span className="text-[var(--text-primary)] font-semibold text-sm">
                  Order on WhatsApp
                </span>
              </button>

              <button
                onClick={handleOrderEmail}
                disabled={!isOrderFormValid}
                className="flex-1 flex items-center justify-center gap-2 p-4
                  border border-[var(--card-border)]
                  hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-300 group cursor-pointer"
              >
                <MailOutlineIcon
                  className="text-[var(--accent-primary)] group-hover:scale-110 transition-transform duration-300"
                  sx={{ fontSize: 22 }}
                />
                <span className="text-[var(--text-primary)] font-semibold text-sm">
                  Order on Email
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SendModal;
