"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft, Shield, CheckCircle2, Rocket,
  User, FileText, Car, CreditCard, X,
  Smartphone, ExternalLink,
  ChevronRight, Lock, Send
} from "lucide-react";
import { getAssetPath } from "@/utils/basePath";
import styles from "./page.module.css";

/* ─── Types ─────────────────────────────────────── */
type VehicleType = "moto" | "carro";
type PaymentModal = "pagoMovil" | "zinli" | "binance" | "paypal" | null;

interface FileField {
  file: File | null;
  preview: string | null;
}

interface FormState {
  // Datos personales
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  telefono: string;
  selfie: FileField;
  // Documentos
  licencia: FileField;
  rcv: FileField;
  certMedico: FileField;
  // Vehículo
  tipoVehiculo: VehicleType;
  fotoVehiculo: FileField;
  modeloVehiculo: string;
  marcaVehiculo: string;
  colorVehiculo: string;
  placa: string;
  // Pago
  metodoPago: string;
  referenciaPago: string;
  // Términos
  terminos: boolean;
}

/* ─── FileUpload Component ───────────────────────── */
function FileUpload({
  id,
  label,
  icon,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  hint: string;
  value: FileField;
  onChange: (f: FileField) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const preview = URL.createObjectURL(file);
    onChange({ file, preview });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ file: null, preview: null });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={styles.fileGroup}>
      <label className={styles.fileLabel}>{label}</label>
      <div
        className={`${styles.dropzone} ${value.preview ? styles.dropzoneFilled : ""}`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        role="button"
        tabIndex={0}
        aria-label={`Subir ${label}`}
        id={`dropzone-${id}`}
      >
        {value.preview ? (
          <>
            <img src={value.preview} alt="Preview" className={styles.previewImg} />
            <button className={styles.clearFile} onClick={clear} aria-label="Quitar imagen">
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <span className={styles.dropzoneIcon}>{icon}</span>
            <span className={styles.dropzoneHint}>{hint}</span>
            <span className={styles.dropzoneSub}>Toca para subir o arrastra aquí</span>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        onChange={handleInput}
        className={styles.fileInputHidden}
        aria-hidden="true"
      />
    </div>
  );
}

/* ─── Payment Modal Component ────────────────────── */
function PaymentModal({
  type,
  onClose,
}: {
  type: PaymentModal;
  onClose: () => void;
}) {
  if (!type) return null;

  const configs = {
    pagoMovil: {
      title: "Pago Móvil",
      subtitle: "Transferencia desde cualquier banco",
      color: "#5E17EB",
      content: (
        <div className={styles.pmContent}>
          <div className={styles.pmQrWrap}>
            <Image
              src={getAssetPath("/icons/QRbancos/QRbanesco.png")}
              alt="QR Banesco"
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.pmBrandLogoWrap}>
            <Image
              src={getAssetPath("/icons/footer/Banesco.svg")}
              alt="Banesco"
              width={140}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.pmDataGrid}>
            <div className={styles.pmDataRow}>
              <span className={styles.pmDataLabel}>
                <Smartphone size={14} /> Celular
              </span>
              <span className={styles.pmDataVal}>0414-2240595</span>
            </div>
            <div className={styles.pmDataRow}>
              <span className={styles.pmDataLabel}>
                <User size={14} /> Identificación
              </span>
              <span className={styles.pmDataVal}>V-14286814</span>
            </div>
            <div className={styles.pmDataRow}>
              <span className={styles.pmDataLabel}>
                <CreditCard size={14} /> Código Banco
              </span>
              <span className={styles.pmDataVal}>0134 (Banesco)</span>
            </div>
          </div>
          <p className={styles.pmNote}>
            Escanea el QR o usa los datos para realizar tu pago de <strong>$5</strong>.
            Luego ingresa la referencia del pago en el formulario.
          </p>
        </div>
      ),
    },
    zinli: {
      title: "Zinli",
      subtitle: "Pago alternativo",
      color: "#5B0EA6",
      content: (
        <div className={styles.pmContent}>
          <div className={styles.pmQrWrap}>
            <Image
              src={getAssetPath("/icons/QRbancos/QRzinli.png")}
              alt="QR Zinli"
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.pmBrandLogoWrap}>
            <Image
              src={getAssetPath("/icons/footer/Zinli.svg")}
              alt="Zinli"
              width={140}
              height={45}
              style={{ objectFit: "contain" }}
            />
          </div>
          <p className={styles.pmNote}>
            Escanea el código QR con tu app de Zinli para realizar el pago de <strong>$5</strong>.
            Luego ingresa la referencia en el formulario.
          </p>
        </div>
      ),
    },
    binance: {
      title: "Binance Pay",
      subtitle: "Pago alternativo en cripto",
      color: "#F0B90B",
      content: (
        <div className={styles.pmContent}>
          <div className={styles.pmQrWrap}>
            <Image
              src={getAssetPath("/icons/QRbancos/QRbinance.png")}
              alt="QR Binance Pay"
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.pmBrandLogoWrap}>
            <Image
              src={getAssetPath("/icons/footer/Binance Pay.svg")}
              alt="Binance Pay"
              width={150}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </div>
          <p className={styles.pmNote}>
            Escanea el código QR con tu app de Binance Pay para transferir el equivalente a <strong>$5</strong>.
            Luego ingresa el ID de transacción en el formulario.
          </p>
        </div>
      ),
    },
    paypal: {
      title: "PayPal",
      subtitle: "Pago alternativo",
      color: "#0070BA",
      content: (
        <div className={styles.pmContent}>
          <div className={styles.pmBrandLogoWrap}>
            <Image
              src={getAssetPath("/icons/footer/Paypal.svg")}
              alt="PayPal"
              width={160}
              height={44}
              style={{ objectFit: "contain" }}
            />
          </div>
          <a
            href="https://www.paypal.com/invoice/p/#NXHJFVXJ4X2T9PYM"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.pmPaypalBtn}
            id="paypal-invoice-link"
          >
            <ExternalLink size={16} />
            Ir a la factura de PayPal
          </a>
          <p className={styles.pmNote}>
            Haz clic en el botón para pagar <strong>$5</strong> a través de la factura de PayPal.
            Luego ingresa el ID de transacción en el formulario.
          </p>
        </div>
      ),
    },
  };

  const cfg = configs[type];

  return (
    <div className={styles.pmOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.pmModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.pmClose} onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>
        <div className={styles.pmHeader} style={{ borderTopColor: cfg.color }}>
          <h3 className={styles.pmTitle}>{cfg.title}</h3>
          <p className={styles.pmSubtitle}>{cfg.subtitle}</p>
        </div>
        {cfg.content}
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────── */
export default function RegistroRiderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activePaymentModal, setActivePaymentModal] = useState<PaymentModal>(null);

  const emptyFile = (): FileField => ({ file: null, preview: null });

  const [form, setForm] = useState<FormState>({
    nombre: "",
    apellido: "",
    cedula: "",
    email: "",
    telefono: "",
    selfie: emptyFile(),
    licencia: emptyFile(),
    rcv: emptyFile(),
    certMedico: emptyFile(),
    tipoVehiculo: "moto",
    fotoVehiculo: emptyFile(),
    modeloVehiculo: "",
    marcaVehiculo: "",
    colorVehiculo: "",
    placa: "",
    metodoPago: "",
    referenciaPago: "",
    terminos: false,
  });

  const setTextField = useCallback(
    (name: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [name]: e.target.value }));
      },
    []
  );

  const setFileField = useCallback(
    (name: keyof FormState) => (f: FileField) => {
      setForm((prev) => ({ ...prev, [name]: f }));
    },
    []
  );

  /* Build FormData for PHP submission */
  const buildFormData = (): FormData => {
    const fd = new FormData();
    fd.append("nombre", form.nombre);
    fd.append("apellido", form.apellido);
    fd.append("cedula", form.cedula);
    fd.append("email", form.email);
    fd.append("telefono", form.telefono);
    fd.append("tipo_vehiculo", form.tipoVehiculo);
    fd.append("modelo_vehiculo", form.modeloVehiculo);
    fd.append("marca_vehiculo", form.marcaVehiculo);
    fd.append("color_vehiculo", form.colorVehiculo);
    fd.append("placa", form.placa);
    fd.append("metodo_pago", form.metodoPago);
    fd.append("referencia_pago", form.referenciaPago);
    // Files
    if (form.selfie.file) fd.append("selfie", form.selfie.file);
    if (form.licencia.file) fd.append("licencia", form.licencia.file);
    if (form.rcv.file) fd.append("rcv", form.rcv.file);
    if (form.certMedico.file) fd.append("cert_medico", form.certMedico.file);
    if (form.fotoVehiculo.file) fd.append("foto_vehiculo", form.fotoVehiculo.file);
    return fd;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const fd = buildFormData();
      const res = await fetch("http://localhost/api/registro-rider.php", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || "Error al procesar el registro.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("No se pudo conectar con el backend PHP (XAMPP). Verifica que Apache y MySQL estén iniciados.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href="/" className={styles.backLink} id="registro-back-home-success">
            <ChevronLeft size={20} /> Volver al inicio
          </Link>
        </header>
        <main className={styles.successPage}>
          <div className={styles.successCard}>
            <div className={styles.successIconWrap}>
              <CheckCircle2 size={60} strokeWidth={1.5} />
            </div>
            <Image
              src={getAssetPath("/icons/footer/vixylogo.png")}
              alt="Vixy Rider"
              width={140}
              height={85}
              style={{ objectFit: "contain", marginBottom: "1rem" }}
            />
            <h1 className={styles.successTitle}>¡Solicitud enviada!</h1>
            <p className={styles.successText}>
              Recibimos tu registro. Nuestro equipo revisará tu información y
              documentos. Te contactaremos en las próximas <strong>48 horas</strong>.
            </p>
            <Link href="/" className={styles.successBtn} id="registro-success-home-btn">
              Volver al inicio
            </Link>
          </div>
        </main>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <div className={styles.page}>
      {/* Modales de pago */}
      <PaymentModal
        type={activePaymentModal}
        onClose={() => setActivePaymentModal(null)}
      />

      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.backLink} id="registro-back-home">
          <ChevronLeft size={20} />
          <span>Volver al inicio</span>
        </Link>
        <div className={styles.logoWrap}>
          <Image
            src={getAssetPath("/icons/footer/vixylogo.png")}
            alt="Vixy Rider"
            width={120}
            height={75}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.pageWrapper}>

          {/* ── Hero title ── */}
          <div className={styles.heroTitle}>
            <h1 className={styles.heroH1}>
              Registro<br />
              <span className={styles.heroAccent}>con Vixy Rider</span>
            </h1>
            <p className={styles.heroSub}>
              Completa todos los campos y realiza el pago<br />
              para asegurar tu cupo como rider.
            </p>
          </div>

          {/* ── Trust badges ── */}
          <div className={styles.badges}>
            <div className={styles.badge}>
              <div className={styles.badgeIcon}><Shield size={22} /></div>
              <div>
                <p className={styles.badgeTitle}>Proceso seguro</p>
                <p className={styles.badgeSub}>Validamos tu información para tu seguridad.</p>
              </div>
            </div>
            <div className={styles.badge}>
              <div className={styles.badgeIcon}><CheckCircle2 size={22} /></div>
              <div>
                <p className={styles.badgeTitle}>Verificación confiable</p>
                <p className={styles.badgeSub}>Revisamos tus documentos para proteger a todos.</p>
              </div>
            </div>
            <div className={styles.badge}>
              <div className={styles.badgeIcon}><Rocket size={22} /></div>
              <div>
                <p className={styles.badgeTitle}>Empieza a generar</p>
                <p className={styles.badgeSub}>Únete y comienza a ganar con cada viaje.</p>
              </div>
            </div>
          </div>

          {/* ── FORM ── */}
          <form
            id="rider-registration-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            noValidate
          >

            {/* ══════════════════════════════════
                SECCIÓN 1 — DATOS PERSONALES
            ══════════════════════════════════ */}
            <section className={styles.formSection} id="seccion-datos-personales">
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}><User size={18} /></div>
                <h2 className={styles.sectionTitle}>1. DATOS PERSONALES</h2>
              </div>

              <div className={styles.fieldsGrid3}>
                {/* Nombre */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="nombre" className={styles.label}>Nombre</label>
                  <input
                    id="nombre" name="nombre" type="text" required
                    placeholder="Ingresa tu nombre"
                    value={form.nombre}
                    onChange={setTextField("nombre")}
                    className={styles.input}
                  />
                </div>

                {/* Apellido */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="apellido" className={styles.label}>Apellido</label>
                  <input
                    id="apellido" name="apellido" type="text" required
                    placeholder="Ingresa tu apellido"
                    value={form.apellido}
                    onChange={setTextField("apellido")}
                    className={styles.input}
                  />
                </div>

                {/* Selfie */}
                <FileUpload
                  id="selfie"
                  label="Selfie"
                  icon={<User size={28} />}
                  hint="Sube tu selfie (mira a la cámara)"
                  value={form.selfie}
                  onChange={setFileField("selfie")}
                />
              </div>

              <div className={styles.fieldsGrid2}>
                {/* Cédula */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="cedula" className={styles.label}>Cédula de identidad</label>
                  <input
                    id="cedula" name="cedula" type="text" required
                    placeholder="Ej: 28.123.456"
                    value={form.cedula}
                    onChange={setTextField("cedula")}
                    className={styles.input}
                  />
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="correo@gmail.com"
                    value={form.email}
                    onChange={setTextField("email")}
                    className={styles.input}
                  />
                </div>

                {/* Teléfono */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="telefono" className={styles.label}>Teléfono</label>
                  <input
                    id="telefono" name="telefono" type="tel" required
                    placeholder="+58 412 000 0000"
                    value={form.telefono}
                    onChange={setTextField("telefono")}
                    className={styles.input}
                  />
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════
                SECCIÓN 2 — DOCUMENTOS PERSONALES
            ══════════════════════════════════ */}
            <section className={styles.formSection} id="seccion-documentos">
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}><FileText size={18} /></div>
                <h2 className={styles.sectionTitle}>2. DOCUMENTOS PERSONALES</h2>
              </div>

              <div className={styles.fieldsGrid3}>
                <FileUpload
                  id="licencia"
                  label="Foto de licencia de conducir"
                  icon={<FileText size={28} />}
                  hint="Sube la foto de tu licencia (vigente)"
                  value={form.licencia}
                  onChange={setFileField("licencia")}
                />
                <FileUpload
                  id="rcv"
                  label="RCV (Registro de Circulación de Vehículo)"
                  icon={<FileText size={28} />}
                  hint="Sube la foto de tu RCV (vigente)"
                  value={form.rcv}
                  onChange={setFileField("rcv")}
                />
                <FileUpload
                  id="certMedico"
                  label="Certificado médico"
                  icon={<FileText size={28} />}
                  hint="Sube tu certificado médico (vigente)"
                  value={form.certMedico}
                  onChange={setFileField("certMedico")}
                />
              </div>
            </section>

            {/* ══════════════════════════════════
                SECCIÓN 3 — INFORMACIÓN DEL VEHÍCULO
            ══════════════════════════════════ */}
            <section className={styles.formSection} id="seccion-vehiculo">
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}><Car size={18} /></div>
                <h2 className={styles.sectionTitle}>3. INFORMACIÓN DEL VEHÍCULO</h2>

                {/* Toggle Moto / Carro */}
                <div className={styles.vehicleToggle}>
                  <button
                    type="button"
                    id="toggle-moto"
                    className={`${styles.toggleBtn} ${form.tipoVehiculo === "moto" ? styles.toggleActive : ""}`}
                    onClick={() => setForm((p) => ({ ...p, tipoVehiculo: "moto" }))}
                  >
                    <Image src={getAssetPath("/icons/footer/moto.svg")} alt="" width={28} height={20} style={{ objectFit: "contain" }} />
                    Moto
                  </button>
                  <button
                    type="button"
                    id="toggle-carro"
                    className={`${styles.toggleBtn} ${form.tipoVehiculo === "carro" ? styles.toggleActive : ""}`}
                    onClick={() => setForm((p) => ({ ...p, tipoVehiculo: "carro" }))}
                  >
                    <Image src={getAssetPath("/icons/footer/carro.svg")} alt="" width={32} height={20} style={{ objectFit: "contain" }} />
                    Carro
                  </button>
                </div>
              </div>

              <div className={styles.vehicleGrid}>
                {/* Foto vehículo */}
                <div className={styles.vehiclePhotoCol}>
                  <FileUpload
                    id="fotoVehiculo"
                    label="Foto del vehículo"
                    icon={
                      form.tipoVehiculo === "moto"
                        ? <Image src={getAssetPath("/icons/footer/moto.svg")} alt="Moto" width={48} height={32} style={{ objectFit: "contain", color: "var(--text-muted)" }} />
                        : <Image src={getAssetPath("/icons/footer/carro.svg")} alt="Carro" width={56} height={32} style={{ objectFit: "contain" }} />
                    }
                    hint="Sube la foto de tu vehículo (lateral, clara)"
                    value={form.fotoVehiculo}
                    onChange={setFileField("fotoVehiculo")}
                  />
                </div>

                {/* Campos vehículo */}
                <div className={styles.vehicleFieldsCol}>
                  <div className={styles.fieldsGrid2}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="modeloVehiculo" className={styles.label}>Modelo del vehículo</label>
                      <input
                        id="modeloVehiculo" name="modeloVehiculo" type="text" required
                        placeholder={form.tipoVehiculo === "moto" ? "Ej: Empire Horse 150" : "Ej: Corolla"}
                        value={form.modeloVehiculo}
                        onChange={setTextField("modeloVehiculo")}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="marcaVehiculo" className={styles.label}>Marca del vehículo</label>
                      <input
                        id="marcaVehiculo" name="marcaVehiculo" type="text" required
                        placeholder={form.tipoVehiculo === "moto" ? "Ej: Empire" : "Ej: Toyota"}
                        value={form.marcaVehiculo}
                        onChange={setTextField("marcaVehiculo")}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="colorVehiculo" className={styles.label}>Color del vehículo</label>
                      <input
                        id="colorVehiculo" name="colorVehiculo" type="text" required
                        placeholder="Ej: Negro / Azul / Rojo"
                        value={form.colorVehiculo}
                        onChange={setTextField("colorVehiculo")}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="placa" className={styles.label}>Número de placa</label>
                      <input
                        id="placa" name="placa" type="text" required
                        placeholder="Ej: AB123CD"
                        value={form.placa}
                        onChange={setTextField("placa")}
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════
                SECCIÓN 4 — PAGO DEL REGISTRO
            ══════════════════════════════════ */}
            <section className={styles.formSection} id="seccion-pago">
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}><CreditCard size={18} /></div>
                <h2 className={styles.sectionTitle}>4. PAGO DEL REGISTRO</h2>
              </div>

              <div className={styles.paymentLayout}>
                {/* Monto card */}
                <div className={styles.amountCard}>
                  <div className={styles.amountDollar}>$5</div>
                  <div>
                    <p className={styles.amountLabel}>Monto del registro</p>
                    <p className={styles.amountSub}>Pago único · No reembolsable</p>
                    <span className={styles.amountBadge}>BCV</span>
                  </div>
                </div>

                {/* Métodos de pago */}
                <div className={styles.paymentMethods}>
                  {/* Principal */}
                  <p className={styles.paymentPrincipalLabel}>PRINCIPAL</p>
                  <button
                    type="button"
                    id="pago-movil-btn"
                    className={`${styles.paymentMethodBtn} ${styles.paymentMethodPrimary}`}
                    onClick={() => setActivePaymentModal("pagoMovil")}
                  >
                    <span className={styles.payMethodIcon}><Smartphone size={22} /></span>
                    <span className={styles.payMethodInfo}>
                      <strong>Pago Móvil</strong>
                      <small>Opción principal · Transferencia desde cualquier banco</small>
                    </span>
                    <ChevronRight size={18} className={styles.payMethodArrow} />
                  </button>

                  {/* Alternativas */}
                  <p className={styles.paymentAltLabel}>OTRAS OPCIONES DE PAGO</p>
                  <div className={styles.paymentAltRow}>
                    <button
                      type="button"
                      id="zinli-btn"
                      className={styles.paymentMethodAlt}
                      onClick={() => setActivePaymentModal("zinli")}
                    >
                      <span className={styles.payAltLogoImg}>
                        <Image src={getAssetPath("/icons/footer/Zinli logo.png")} alt="Zinli" width={40} height={24} style={{ objectFit: "contain" }} />
                      </span>
                      <span className={styles.payAltName}>Zinli</span>
                      <small>Pago alternativo</small>
                      <ChevronRight size={14} />
                    </button>

                    <button
                      type="button"
                      id="binance-btn"
                      className={styles.paymentMethodAlt}
                      onClick={() => setActivePaymentModal("binance")}
                    >
                      <span className={styles.payAltLogoImg}>
                        <Image src={getAssetPath("/icons/footer/Binance logo.svg")} alt="Binance Pay" width={56} height={24} style={{ objectFit: "contain" }} />
                      </span>
                      <span className={styles.payAltName}>Binance Pay</span>
                      <small>Pago alternativo</small>
                      <ChevronRight size={14} />
                    </button>

                    <button
                      type="button"
                      id="paypal-btn"
                      className={styles.paymentMethodAlt}
                      onClick={() => setActivePaymentModal("paypal")}
                    >
                      <span className={styles.payAltLogoImg}>
                        <Image src={getAssetPath("/icons/footer/Paypal logo.svg")} alt="PayPal" width={56} height={24} style={{ objectFit: "contain" }} />
                      </span>
                      <span className={styles.payAltName}>PayPal</span>
                      <small>Pago alternativo</small>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Método y referencia */}
              <div className={styles.fieldsGrid2} style={{ marginTop: "1.25rem" }}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="metodoPago" className={styles.label}>Método de pago utilizado</label>
                  <select
                    id="metodoPago"
                    name="metodo_pago"
                    required
                    value={form.metodoPago}
                    onChange={(e) => setForm((p) => ({ ...p, metodoPago: e.target.value }))}
                    className={`${styles.input} ${styles.select}`}
                  >
                    <option value="" disabled>Selecciona el método</option>
                    <option value="pago_movil">Pago Móvil</option>
                    <option value="zinli">Zinli</option>
                    <option value="binance">Binance</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="referenciaPago" className={styles.label}>Referencia / ID de transacción</label>
                  <input
                    id="referenciaPago"
                    name="referencia_pago"
                    type="text"
                    required
                    placeholder="Ej: 123456789"
                    value={form.referenciaPago}
                    onChange={setTextField("referenciaPago")}
                    className={styles.input}
                  />
                </div>
              </div>
            </section>

            {/* ── Términos y envío ── */}
            <div className={styles.submitArea}>
              <label className={styles.checkboxLabel} htmlFor="terminos">
                <input
                  id="terminos"
                  name="terminos"
                  type="checkbox"
                  checked={form.terminos}
                  onChange={(e) => setForm((p) => ({ ...p, terminos: e.target.checked }))}
                  className={styles.checkbox}
                />
                <span>
                  Acepto los{" "}
                  <a href="#" className={styles.termsLink}>Términos y Condiciones</a>
                  {" "}y la{" "}
                  <a href="#" className={styles.termsLink}>Política de Privacidad</a>
                  {" "}de Vixy Rider.
                </span>
              </label>

              {errorMessage && (
                <div style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#ef4444",
                  padding: "0.85rem 1.2rem",
                  borderRadius: "10px",
                  fontSize: "0.92rem",
                  marginBottom: "1rem",
                  textAlign: "center"
                }}>
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                id="registro-submit-btn"
                className={styles.submitBtn}
                disabled={
                  loading ||
                  !form.nombre || !form.apellido || !form.cedula ||
                  !form.email || !form.telefono || !form.placa ||
                  !form.metodoPago || !form.referenciaPago || !form.terminos
                }
              >
                <Send size={18} />
                {loading ? "Enviando registro..." : "Enviar solicitud de registro"}
              </button>
            </div>

            {/* ── Footer seguridad ── */}
            <div className={styles.securityFooter}>
              <Lock size={15} />
              <span>
                <strong>Tu información está protegida.</strong>{" "}
                Usamos encriptación y cumplimos con altos estándares de seguridad.
              </span>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
