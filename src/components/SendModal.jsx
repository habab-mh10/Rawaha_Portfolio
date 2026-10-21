import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import { getAllPackages } from "../api/pricing.api";

// =====================================================================
// SendModal — two modes:
//   mode="send"  → only 2 action buttons (used by Contact section)
//   mode="order" → full form + package checkboxes + 2 action buttons
// =====================================================================

// Fallback packages shown if the API is unreachable
const FALLBACK_PACKAGES = [
  { id: "web-dev", label: "Web Development",  price: "$1500" },
  { id: "graphic", label: "Graphic Designing", price: "$500"  },
  { id: "ugc-ads", label: "UGC Ads",           price: "$300"  },
];

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    fontFamily: "Syne",
    "& input": {
      fontFamily: "Syne",
      color: "var(--text-primary)",
      // Override browser autofill background
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px var(--card-bg) inset",
        WebkitTextFillColor: "var(--text-primary)",
        caretColor: "var(--text-primary)",
        transition: "background-color 9999s ease-in-out 0s",
      },
      "&:-webkit-autofill:hover": {
        WebkitBoxShadow: "0 0 0 1000px var(--card-bg) inset",
        WebkitTextFillColor: "var(--text-primary)",
      },
      "&:-webkit-autofill:focus": {
        WebkitBoxShadow: "0 0 0 1000px var(--card-bg) inset",
        WebkitTextFillColor: "var(--text-primary)",
      },
      "&:-webkit-autofill:active": {
        WebkitBoxShadow: "0 0 0 1000px var(--card-bg) inset",
        WebkitTextFillColor: "var(--text-primary)",
      },
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
  mode = "send",
  // mode="send" callbacks
  onWhatsApp,
  onEmail,
  // pre-selected package id when opened from a pricing card
  defaultPackage = null,
}) => {

  // ── Scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ── Backend packages (order mode) ────────────────────────────────────
  const [packages, setPackages] = useState(FALLBACK_PACKAGES);

  useEffect(() => {
    if (mode !== "order") return;
    getAllPackages()
      .then((res) => {
        const data = res.data ?? [];
        if (data.length > 0) {
          // Map backend package to checkbox shape
          setPackages(
            data.map((pkg) => ({
              id:    pkg._id,
              label: pkg.name,
              price: `$${pkg.price}`,
            }))
          );
        }
      })
      .catch(() => {
        // keep FALLBACK_PACKAGES
      });
  }, [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Order form state ─────────────────────────────────────────────────
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Selected packages as a Set of ids
  const [selectedPackages, setSelectedPackages] = useState(new Set());

  // When modal opens with a defaultPackage, pre-check it
  useEffect(() => {
    if (isOpen && defaultPackage) {
      setSelectedPackages(new Set([defaultPackage]));
    }
    if (!isOpen) {
      // reset when closed
      setSelectedPackages(new Set());
      setOrderData({ name: "", email: "", message: "" });
    }
  }, [isOpen, defaultPackage]);

  const togglePackage = (id) => {
    setSelectedPackages((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleOrderChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  // Build the message string from form + selected packages
  const buildMessage = () => {
    const packageNames = packages
      .filter((p) => selectedPackages.has(p.id))
      .map((p) => `• ${p.label} (${p.price})`)
      .join("\n");

    return (
      `New Order Request\n\n` +
      `Name: ${orderData.name}\n` +
      `Email: ${orderData.email}\n\n` +
      `Interested In:\n${packageNames || "Not specified"}\n\n` +
      `Message:\n${orderData.message}`
    );
  };

  const handleOrderWhatsApp = () => {
    window.open(
      `https://wa.me/923028053159?text=${encodeURIComponent(buildMessage())}`,
      "_blank"
    );
    onClose();
  };

  const handleOrderEmail = () => {
    const subject = encodeURIComponent(
      `Order Request — ${
        packages.filter((p) => selectedPackages.has(p.id))
          .map((p) => p.label)
          .join(", ") || "General Inquiry"
      }`
    );
    window.open(
      `mailto:ownerrawiporfolio@rawaha.me?subject=${subject}&body=${encodeURIComponent(buildMessage())}`,
      "_blank"
    );
    onClose();
  };

  const isOrderFormValid =
    orderData.name.trim() &&
    orderData.email.trim() &&
    orderData.message.trim() &&
    selectedPackages.size > 0;

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center px-4 py-6"
      style={{ zIndex: 99999 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        className="relative z-10 bg-[var(--card-bg)] border border-[var(--card-border)] w-full max-w-lg p-8 sm:p-10 font-syne shadow-2xl overflow-y-auto"
        style={{ animation: "modalFadeIn 0.25s ease", maxHeight: "90vh" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* ── MODE: send ─────────────────────────────────────────────── */}
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
                className="flex-1 flex flex-col items-center gap-3 p-6 border border-[var(--card-border)] hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 group cursor-pointer"
              >
                <WhatsAppIcon className="text-green-500 group-hover:scale-110 transition-transform duration-300" sx={{ fontSize: 42 }} />
                <span className="text-[var(--text-primary)] font-semibold text-sm">WhatsApp</span>
                <span className="text-[var(--text-secondary)] text-xs text-center leading-relaxed">Send directly via WhatsApp</span>
              </button>

              <button
                onClick={onEmail}
                className="flex-1 flex flex-col items-center gap-3 p-6 border border-[var(--card-border)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-all duration-300 group cursor-pointer"
              >
                <MailOutlineIcon className="text-[var(--accent-primary)] group-hover:scale-110 transition-transform duration-300" sx={{ fontSize: 42 }} />
                <span className="text-[var(--text-primary)] font-semibold text-sm">Email</span>
                <span className="text-[var(--text-secondary)] text-xs text-center leading-relaxed">Send directly via your email</span>
              </button>
            </div>
          </>
        )}

        {/* ── MODE: order ────────────────────────────────────────────── */}
        {mode === "order" && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              Place Your Order
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              Select what you need, fill in the details, then send.
            </p>

            {/* ── Package checkboxes ── */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                What are you interested in? <span className="text-red-400">*</span>
              </p>
              <div className="flex flex-col gap-2">
                {packages.map((pkg) => {
                  const checked = selectedPackages.has(pkg.id);
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => togglePackage(pkg.id)}
                      className={`flex items-center gap-3 w-full px-4 py-3 border text-left transition-all duration-200 ${
                        checked
                          ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/8"
                          : "border-[var(--card-border)] hover:border-[var(--accent-primary)]/50"
                      }`}
                    >
                      {/* Custom checkbox */}
                      <span
                        className={`flex-shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-200 ${
                          checked
                            ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]"
                            : "border-[var(--text-secondary)]"
                        }`}
                      >
                        {checked && <CheckIcon sx={{ fontSize: 14 }} className="text-white" />}
                      </span>
                      <span className="flex-1 text-sm font-medium text-[var(--text-primary)]">
                        {pkg.label}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] font-medium">
                        {pkg.price}
                      </span>
                    </button>
                  );
                })}
              </div>
              {selectedPackages.size === 0 && (
                <p className="text-xs text-red-400 mt-2">Please select at least one package</p>
              )}
            </div>

            <div className="w-full h-px bg-[var(--card-border)] mb-6" />

            {/* ── Form fields ── */}
            <div className="flex flex-col gap-5">
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

              <div className="relative w-full">
                <textarea
                  id="order-message"
                  name="message"
                  value={orderData.message}
                  onChange={handleOrderChange}
                  required
                  rows={4}
                  placeholder=" "
                  className="w-full peer rounded-md border border-[var(--text-secondary)] bg-transparent px-3 pt-5 pb-2 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] transition-all duration-200 font-syne outline-none resize-none"
                />
                <label
                  htmlFor="order-message"
                  className="absolute left-3 top-0 px-1 text-[var(--text-secondary)] text-sm bg-[var(--card-bg)] transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-[0.8rem]"
                >
                  Describe Your Project *
                </label>
              </div>
            </div>

            <div className="w-full h-px bg-[var(--card-border)] my-6" />

            {/* ── Send buttons ── */}
            <p className="text-[var(--text-secondary)] text-xs mb-4">
              Choose how you want to send your order:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOrderWhatsApp}
                disabled={!isOrderFormValid}
                className="flex-1 flex items-center justify-center gap-2 p-4 border border-[var(--card-border)] hover:border-green-500 hover:bg-green-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 group cursor-pointer"
              >
                <WhatsAppIcon className="text-green-500 group-hover:scale-110 transition-transform duration-300" sx={{ fontSize: 22 }} />
                <span className="text-[var(--text-primary)] font-semibold text-sm">Order on WhatsApp</span>
              </button>

              <button
                onClick={handleOrderEmail}
                disabled={!isOrderFormValid}
                className="flex-1 flex items-center justify-center gap-2 p-4 border border-[var(--card-border)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 group cursor-pointer"
              >
                <MailOutlineIcon className="text-[var(--accent-primary)] group-hover:scale-110 transition-transform duration-300" sx={{ fontSize: 22 }} />
                <span className="text-[var(--text-primary)] font-semibold text-sm">Order on Email</span>
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
