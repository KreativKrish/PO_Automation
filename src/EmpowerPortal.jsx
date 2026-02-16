import { useState, useEffect, useCallback } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_PRFS = [
  {
    id: "PRF-2526-001",
    requester: "Anika Sharma",
    dept: "Product",
    costCode: "CC-1042",
    project: "EdTech Platform v3",
    vendorName: "CloudHost Solutions",
    vendorCode: "VND-0412",
    vendorStatus: "existing",
    status: "new",
    pan: "ABCDE1234F",
    gstin: "18ABCDE1234F1Z5",
    servicePeriod: { from: "2025-04-01", to: "2025-06-30" },
    purpose: "Cloud hosting & infrastructure for Q1 rollout",
    qty: 3,
    rate: 85000,
    poValueExGst: 255000,
    gstAmount: 45900,
    totalPoValue: 300900,
    glCode: "GL-5021",
    nature: "Service",
    poNumber: null,
    poDate: null,
    createdAt: "2026-01-28T09:14:00Z",
    updatedAt: "2026-02-01T14:30:00Z",
    remarks: [
      { by: "System", at: "2026-01-28T09:14:00Z", text: "PRF auto-detected and ingested." },
      { by: "System", at: "2026-01-28T09:15:00Z", text: "Vendor validated – existing in SAGE." },
    ],
    history: [
      { status: "New", at: "2026-01-28T09:14:00Z" },
    ],
    docs: [
      { name: "Approved PRF", type: "prf", url: "#", source: "PRF Form", uploadedAt: "2026-01-28T09:14:00Z" },
      { name: "Vendor PAN Card", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-01-28T09:14:00Z" },
      { name: "Bank Details Letter", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-01-28T09:14:00Z" },
    ],
  },
  {
    id: "PRF-2526-002",
    requester: "Rohan Mehta",
    dept: "Engineering",
    costCode: "CC-2078",
    project: "Mobile App Phase II",
    vendorName: "DevTools Inc",
    vendorCode: null,
    vendorStatus: "new_pending",
    status: "pending",
    pan: "FGHIJ5678K",
    gstin: null,
    servicePeriod: { from: "2025-03-15", to: "2025-05-14" },
    purpose: "Mobile testing & QA tooling licence",
    qty: 12,
    rate: 4200,
    poValueExGst: 50400,
    gstAmount: 9072,
    totalPoValue: 59472,
    glCode: "GL-5034",
    nature: "Software",
    poNumber: null,
    poDate: null,
    createdAt: "2026-01-30T11:22:00Z",
    updatedAt: "2026-01-30T11:23:00Z",
    remarks: [
      { by: "System", at: "2026-01-30T11:22:00Z", text: "PRF auto-detected." },
      { by: "System", at: "2026-01-30T11:23:00Z", text: "Vendor not found – VRF/VIF triggered." },
    ],
    history: [
      { status: "New", at: "2026-01-30T11:22:00Z" },
      { status: "Pending", at: "2026-01-30T11:23:00Z" },
    ],
    docs: [{ name: "Approved PRF", type: "prf", url: "#", source: "PRF Form", uploadedAt: "2026-01-30T11:22:00Z" }],
    requester: "Priya Nambiar",
    dept: "Content",
    costCode: "CC-3091",
    project: "University Partnership – IISC",
    vendorName: "MediaWorks Studio",
    vendorCode: "VND-0198",
    vendorStatus: "existing",
    status: "closed",
    pan: "LMNOP9012Q",
    gstin: "18LMNOP9012Q1Z5",
    servicePeriod: { from: "2025-02-01", to: "2025-04-30" },
    purpose: "Video production for university onboarding",
    qty: 2,
    rate: 120000,
    poValueExGst: 240000,
    gstAmount: 43200,
    totalPoValue: 283200,
    glCode: "GL-5019",
    nature: "Service",
    poNumber: "TLE-FIN-2526-003",
    poDate: "2026-02-02",
    createdAt: "2026-01-25T08:00:00Z",
    updatedAt: "2026-02-02T10:15:00Z",
    remarks: [
      { by: "System", at: "2026-01-25T08:00:00Z", text: "PRF auto-detected and ingested." },
      { by: "Vivek", at: "2026-02-02T10:10:00Z", text: "All details verified. Approved for PO generation." },
      { by: "System", at: "2026-02-02T10:15:00Z", text: "PO generated and sent to requester." },
    ],
    history: [
      { status: "New", at: "2026-01-25T08:00:00Z" },
      { status: "Approved", at: "2026-02-02T10:10:00Z" },
      { status: "Closed / PO Sent", at: "2026-02-02T10:15:00Z" },
    ],
    docs: [
      { name: "Approved PRF", type: "prf", url: "#", source: "PRF Form", uploadedAt: "2026-01-25T08:00:00Z" },
      { name: "Vendor PAN Card", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-01-25T08:00:00Z" },
      { name: "MSME Declaration", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-01-25T08:00:00Z" },
      { name: "Bank Details Letter", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-01-25T08:00:00Z" },
      { name: "Generated PO", type: "po", url: "#", source: "System Generated", uploadedAt: "2026-02-02T10:15:00Z" },
    ],
  },
  {
    id: "PRF-2526-004",
    requester: "Siddharth Rao",
    dept: "Finance",
    costCode: "CC-4055",
    project: "Internal Audit Tools",
    vendorName: "FinSoft Ltd",
    vendorCode: "VND-0301",
    vendorStatus: "existing",
    status: "rejected",
    pan: "RSTUV3456W",
    gstin: "18RSTUV3456W1Z5",
    servicePeriod: { from: "2025-04-01", to: "2025-03-31" },
    purpose: "Audit software licence renewal",
    qty: 1,
    rate: 95000,
    poValueExGst: 95000,
    gstAmount: 17100,
    totalPoValue: 112100,
    glCode: "GL-5045",
    nature: "Software",
    poNumber: null,
    poDate: null,
    createdAt: "2026-01-22T16:45:00Z",
    updatedAt: "2026-01-29T11:00:00Z",
    remarks: [
      { by: "System", at: "2026-01-22T16:45:00Z", text: "PRF auto-detected." },
      { by: "Vivek", at: "2026-01-29T11:00:00Z", text: "Service period dates are invalid – 'To' date is before 'From' date. Please correct and resubmit." },
    ],
    history: [
      { status: "New", at: "2026-01-22T16:45:00Z" },
      { status: "Declined / Rejected", at: "2026-01-29T11:00:00Z" },
    ],
    docs: [
      { name: "Approved PRF", type: "prf", url: "#", source: "PRF Form", uploadedAt: "2026-01-22T16:45:00Z" },
      { name: "Vendor PAN Card", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-01-22T16:45:00Z" },
    ],
    requester: "Kavitha Menon",
    dept: "Marketing",
    costCode: "CC-5012",
    project: "Brand Refresh 2026",
    vendorName: "PixelCraft Agency",
    vendorCode: "VND-0505",
    vendorStatus: "existing",
    status: "approved",
    pan: "XYZAB7890C",
    gstin: "18XYZAB7890C1Z5",
    servicePeriod: { from: "2025-02-10", to: "2025-05-09" },
    purpose: "Brand identity & marketing collaterals",
    qty: 5,
    rate: 60000,
    poValueExGst: 300000,
    gstAmount: 54000,
    totalPoValue: 354000,
    glCode: "GL-5028",
    nature: "Service",
    poNumber: null,
    poDate: null,
    createdAt: "2026-01-18T10:00:00Z",
    updatedAt: "2026-01-31T15:20:00Z",
    remarks: [
      { by: "System", at: "2026-01-18T10:00:00Z", text: "PRF auto-detected." },
      { by: "Vivek", at: "2026-01-31T15:15:00Z", text: "Approved. PO generation pending." },
    ],
    history: [
      { status: "New", at: "2026-01-18T10:00:00Z" },
      { status: "Approved", at: "2026-01-31T15:15:00Z" },
    ],
    docs: [
      { name: "Approved PRF", type: "prf", url: "#", source: "PRF Form", uploadedAt: "2026-01-18T10:00:00Z" },
      { name: "Vendor PAN Card", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-01-18T10:00:00Z" },
      { name: "GST Registration Cert", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-01-18T10:00:00Z" },
    ],
  },
  {
    id: "PRF-2526-006",
    requester: "Amit Desai",
    dept: "Operations",
    costCode: "CC-6012",
    project: "Warehouse Management System",
    vendorName: "LogiTech Solutions",
    vendorCode: "VND-0678",
    vendorStatus: "existing",
    status: "new",
    pan: "QWERT1234Z",
    gstin: "18QWERT1234Z1Z5",
    servicePeriod: { from: "2025-03-01", to: "2025-08-31" },
    purpose: "Warehouse automation software implementation",
    qty: 1,
    rate: 450000,
    poValueExGst: 450000,
    gstAmount: 81000,
    totalPoValue: 531000,
    glCode: "GL-5045",
    nature: "Software",
    poNumber: null,
    poDate: null,
    createdAt: "2026-02-03T08:30:00Z",
    updatedAt: "2026-02-03T08:30:00Z",
    remarks: [
      { by: "System", at: "2026-02-03T08:30:00Z", text: "PRF auto-detected and ingested." },
    ],
    history: [
      { status: "New", at: "2026-02-03T08:30:00Z" },
    ],
    docs: [
      { name: "Approved PRF", type: "prf", url: "#", source: "PRF Form", uploadedAt: "2026-02-03T08:30:00Z" },
    ],
  },
  {
    id: "PRF-2526-007",
    requester: "Neha Kapoor",
    dept: "HR",
    costCode: "CC-7089",
    project: "Employee Training Program",
    vendorName: "SkillUp Academy",
    vendorCode: null,
    vendorStatus: "new_pending",
    status: "pending",
    pan: "ASDFG5678H",
    gstin: null,
    servicePeriod: { from: "2025-04-01", to: "2025-06-30" },
    purpose: "Leadership development training for managers",
    qty: 25,
    rate: 15000,
    poValueExGst: 375000,
    gstAmount: 67500,
    totalPoValue: 442500,
    glCode: "GL-5067",
    nature: "Service",
    poNumber: null,
    poDate: null,
    createdAt: "2026-02-02T14:20:00Z",
    updatedAt: "2026-02-02T14:21:00Z",
    remarks: [
      { by: "System", at: "2026-02-02T14:20:00Z", text: "PRF auto-detected." },
      { by: "System", at: "2026-02-02T14:21:00Z", text: "Vendor not found – VRF/VIF triggered." },
    ],
    history: [
      { status: "New", at: "2026-02-02T14:20:00Z" },
      { status: "Pending", at: "2026-02-02T14:21:00Z" },
    ],
    docs: [
      { name: "Approved PRF", type: "prf", url: "#", source: "PRF Form", uploadedAt: "2026-02-02T14:20:00Z" },
      { name: "Training Proposal", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-02-02T14:20:00Z" },
    ],
  },
  {
    id: "PRF-2526-008",
    requester: "Rajesh Kumar",
    dept: "IT",
    costCode: "CC-8045",
    project: "Cybersecurity Enhancement",
    vendorName: "SecureNet Systems",
    vendorCode: null,
    vendorStatus: "new_pending",
    status: "new",
    pan: "ZXCVB9876M",
    gstin: "18ZXCVB9876M1Z5",
    servicePeriod: { from: "2025-02-15", to: "2025-12-31" },
    purpose: "Annual cybersecurity audit and penetration testing",
    qty: 2,
    rate: 225000,
    poValueExGst: 450000,
    gstAmount: 81000,
    totalPoValue: 531000,
    glCode: "GL-5089",
    nature: "Service",
    poNumber: null,
    poDate: null,
    createdAt: "2026-02-03T10:15:00Z",
    updatedAt: "2026-02-03T10:15:00Z",
    remarks: [
      { by: "System", at: "2026-02-03T10:15:00Z", text: "PRF auto-detected and ingested." },
    ],
    history: [
      { status: "New", at: "2026-02-03T10:15:00Z" },
    ],
    docs: [
      { name: "Approved PRF", type: "prf", url: "#", source: "PRF Form", uploadedAt: "2026-02-03T10:15:00Z" },
      { name: "Vendor Proposal", type: "vendor", url: "#", source: "PRF Attachment", uploadedAt: "2026-02-03T10:15:00Z" },
    ],
  },
];

const MOCK_VENDORS = [
  {
    code: "VND-0412",
    name: "CloudHost Solutions",
    newVendorName: "CloudHost Solutions Pvt Ltd",
    pan: "ABCDE1234F",
    gstin: "18ABCDE1234F1Z5",
    status: "active",
    msme: true,
    type: "Teamlease Edtech",
    bankName: "HDFC Bank",
    bankAccountNo: "50200012345678",
    ifscCode: "HDFC0001234",
    msmeRegNo: "MSME-DL-2023-001234",
    typeOfEnterprise: "Micro",
    majorActivity: "IT Services"
  },
  {
    code: "VND-0198",
    name: "MediaWorks Studio",
    newVendorName: "MediaWorks Creative Studio LLP",
    pan: "LMNOP9012Q",
    gstin: "18LMNOP9012Q1Z5",
    status: "active",
    msme: false,
    type: "Teamlease Foundation",
    bankName: "ICICI Bank",
    bankAccountNo: "60300098765432",
    ifscCode: "ICIC0006789",
    msmeRegNo: "—",
    typeOfEnterprise: "Medium",
    majorActivity: "Media Production"
  },
  {
    code: "VND-0301",
    name: "FinSoft Ltd",
    newVendorName: "FinSoft Technologies Limited",
    pan: "RSTUV3456W",
    gstin: "18RSTUV3456W1Z5",
    status: "active",
    msme: true,
    type: "AIF",
    bankName: "Axis Bank",
    bankAccountNo: "91100054321098",
    ifscCode: "UTIB0001234",
    msmeRegNo: "MSME-MH-2022-005678",
    typeOfEnterprise: "Small",
    majorActivity: "Software Development"
  },
  {
    code: "VND-0505",
    name: "PixelCraft Agency",
    newVendorName: "PixelCraft Digital Agency",
    pan: "XYZAB7890C",
    gstin: "18XYZAB7890C1Z5",
    status: "active",
    msme: false,
    type: "Teamlease Edtech",
    bankName: "SBI",
    bankAccountNo: "30400011223344",
    ifscCode: "SBIN0012345",
    msmeRegNo: "—",
    typeOfEnterprise: "Medium",
    majorActivity: "Marketing Services"
  },
  {
    code: null,
    name: "DevTools Inc",
    newVendorName: "DevTools Incorporated",
    pan: "FGHIJ5678K",
    gstin: null,
    status: "approval_pending",
    msme: false,
    type: "Teamlease Foundation",
    bankName: "Kotak Mahindra Bank",
    bankAccountNo: "71200099887766",
    ifscCode: "KKBK0005678",
    msmeRegNo: "—",
    typeOfEnterprise: "Small",
    majorActivity: "Software Tools",
    contactName: "John Smith",
    contactEmail: "john@devtools.com",
    contactPhone: "+91 9876543210",
    vifSubmittedAt: "2026-01-31T10:00:00Z",
    vifSubmittedBy: "Rohan Mehta",
    docs: [
      { name: "PAN Card", type: "vendor", url: "#" },
      { name: "Bank Statement", type: "vendor", url: "#" },
      { name: "Company Registration", type: "vendor", url: "#" },
    ],
    remarks: [
      { by: "System", at: "2026-01-30T11:23:00Z", text: "VIF email sent to requester." },
      { by: "Rohan Mehta", at: "2026-01-31T10:00:00Z", text: "VIF form submitted with all required documents." },
    ]
  },
  {
    code: null,
    name: "SkillUp Academy",
    newVendorName: "SkillUp Learning Academy Pvt Ltd",
    pan: "ASDFG5678H",
    gstin: null,
    status: "pending_requester",
    msme: true,
    type: "Teamlease Edtech",
    bankName: "",
    bankAccountNo: "",
    ifscCode: "",
    msmeRegNo: "MSME-KA-2024-009876",
    typeOfEnterprise: "Micro",
    majorActivity: "Training Services",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    vifTriggeredAt: "2026-02-02T14:21:00Z",
    docs: [],
    remarks: [
      { by: "System", at: "2026-02-02T14:21:00Z", text: "Vendor not found in SAGE. VIF email sent to requester Neha Kapoor." },
    ]
  },
];

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const STATUS_MAP = {
  new: { label: "New", color: "#60a5fa", bg: "#dbeafe" },
  pending: { label: "Pending", color: "#fb923c", bg: "#ffedd5" },
  approved: { label: "Approved", color: "#34d399", bg: "#d1fae5" },
  closed: { label: "Closed / PO Sent", color: "#14b8a6", bg: "#ccfbf1" },
  rejected: { label: "Declined / Rejected", color: "#f87171", bg: "#fee2e2" },
};

const VENDOR_STATUS_MAP = {
  existing: { label: "Existing", color: "#16a34a", bg: "#dcfce7" },
  pending_requester: { label: "Pending - Requester", color: "#f59e0b", bg: "#fef3c7" },
  approval_pending: { label: "Approval Pending", color: "#fb923c", bg: "#ffedd5" },
  pending_sage: { label: "Pending - SAGE", color: "#3b82f6", bg: "#dbeafe" },
  created: { label: "Created", color: "#14b8a6", bg: "#ccfbf1" },
};

const STATUS_LIFECYCLE = ["New", "Pending", "Approved", "Closed / PO Sent"];

// ─── ICONS (inline SVGs) ─────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor", ...props }) => {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    prfs: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>,
    vendors: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    orders: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></>,
    documents: <><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></>,
    reports: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="8" r="4" /></>,
    check: <><polyline points="20 6 9 17 4 12" /></>,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
    arrow_left: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
    chevron_down: <><polyline points="6 9 12 15 18 9" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    file_text: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>,
    sync: <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>,
    folder: <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {paths[name]}
    </svg>
  );
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};
const fmtTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};
const rupee = (n) => "₹ " + Number(n).toLocaleString("en-IN");
const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP.new;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, background: s.bg, color: s.color, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, display: "inline-block" }} />
      {s.label}
    </span>
  );
};

// ─── THEME TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg: "#f0f4f8",
  sidebar: "#1a202c",
  sidebarActive: "#2d3748",
  sidebarText: "#a0aec0",
  sidebarTextActive: "#fff",
  primary: "#3b82f6",
  primaryDark: "#2563eb",
  primaryLight: "#eff6ff",
  cardBg: "#ffffff",
  cardBorder: "#e2e8f0",
  textMain: "#1a202c",
  textSub: "#718096",
  accent: "#f6ad55",
  danger: "#fc8181",
  success: "#68d391",
  headerH: 56,
  sidebarW: 230,
};

// ═══════════════════════════════════════════════════════════════════════════════
//  SIDEBAR
// ═══════════════════════════════════════════════════════════════════════════════
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard" },
  { key: "prfs", label: "PRFs", icon: "prfs", badge: 2 },
  { key: "vendors", label: "Vendors", icon: "vendors" },
  { key: "orders", label: "Purchase Orders", icon: "orders" },
  { key: "documents", label: "Documents", icon: "documents" },
];


function Sidebar({ active, onNav }) {
  return (
    <aside style={{ width: T.sidebarW, background: T.sidebar, minHeight: "100vh", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, zIndex: 100, boxShadow: "2px 0 12px rgba(0,0,0,.18)" }}>
      {/* Logo */}
      <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid #2d3748" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="orders" size={18} color="#fff" />
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>Empower</div>
            <div style={{ color: "#718096", fontSize: 10, textTransform: "uppercase", letterSpacing: "1.2px" }}>Portal</div>
          </div>
        </div>
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <button key={item.key} onClick={() => onNav(item.key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 7, border: "none", background: isActive ? T.sidebarActive : "transparent", color: isActive ? T.sidebarTextActive : T.sidebarText, cursor: "pointer", fontSize: 13.5, fontWeight: isActive ? 600 : 400, transition: "background .15s, color .15s", width: "100%", textAlign: "left" }}>
              <Icon name={item.icon} size={17} color={isActive ? T.sidebarTextActive : T.sidebarText} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{ background: T.primary, color: "#fff", borderRadius: 10, fontSize: 11, padding: "1px 7px", fontWeight: 700 }}>{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>
      {/* User stub */}
      <div style={{ borderTop: "1px solid #2d3748", padding: "14px 12px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#f6ad55,#fc8181)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="user" size={16} color="#fff" />
        </div>
        <div>
          <div style={{ color: "#fff", fontSize: 12.5, fontWeight: 600 }}>Vivek M.</div>
          <div style={{ color: "#718096", fontSize: 10.5 }}>Finance Reviewer</div>
        </div>
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TOP BAR
// ═══════════════════════════════════════════════════════════════════════════════
function TopBar({ title }) {
  const [search, setSearch] = useState("");
  return (
    <header style={{ position: "fixed", top: 0, left: T.sidebarW, right: 0, height: T.headerH, background: "#fff", borderBottom: `1px solid ${T.cardBorder}`, display: "flex", alignItems: "center", gap: 16, padding: "0 28px", zIndex: 90, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: T.textMain, margin: 0, flex: "0 1 auto", minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "400px" }}>{title}</h1>
      {/* Search */}
      <div style={{ flex: 1, maxWidth: 380, position: "relative", marginLeft: 24 }}>
        <Icon name="search" size={15} color={T.textSub} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search PRF / PO / Vendor…" style={{ width: "100%", padding: "7px 12px 7px 33px", borderRadius: 7, border: `1px solid ${T.cardBorder}`, fontSize: 13, outline: "none", background: T.bg, color: T.textMain, boxSizing: "border-box" }} />
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <Icon name="bell" size={20} color={T.textSub} />
          <span style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: T.danger, border: "2px solid #fff" }} />
        </button>
        <div style={{ width: 1, height: 26, background: T.cardBorder }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#f6ad55,#fc8181)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="user" size={15} color="#fff" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.textMain }}>Vivek M.</span>
        </div>
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  REUSABLE CARD
// ═══════════════════════════════════════════════════════════════════════════════
function Card({ children, style = {}, ...rest }) {
  return (
    <div style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,.07)", ...style }} {...rest}>
      {children}
    </div>
  );
}
function CardHeader({ icon, title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {icon && <Icon name={icon} size={17} color={T.primary} />}
        <span style={{ fontSize: 14, fontWeight: 700, color: T.textMain }}>{title}</span>
      </div>
      {action}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function Dashboard({ prfs, onSelectPrf }) {
  const stats = [
    { label: "New PRFs", value: prfs.filter((p) => p.status === "new").length, icon: "prfs", color: "#60a5fa", bg: "#dbeafe" },
    { label: "Pending Review", value: prfs.filter((p) => p.status === "pending_review").length, icon: "clock", color: "#fb923c", bg: "#ffedd5" },
    { label: "Vendor Pending", value: prfs.filter((p) => p.status === "vendor_validation" || p.vendorStatus === "new_pending").length, icon: "vendors", color: "#a78bfa", bg: "#ede9fe" },
    { label: "Approved Today", value: prfs.filter((p) => p.status === "approved").length, icon: "check", color: "#34d399", bg: "#d1fae5" },
  ];
  return (
    <div>
      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <Card key={s.label} style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, color: T.textSub, fontWeight: 500, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: T.textMain }}>{s.value}</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={s.icon} size={20} color={s.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* PRF Table */}
      <Card>
        <CardHeader icon="prfs" title="PRF List View" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: T.bg }}>
                {["PRF Ref No", "Requester", "Vendor Name", "Vendor Status", "Current Status", "PO Number", "Ageing", "Action"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prfs.map((prf, i) => {
                const ageing = Math.round((new Date() - new Date(prf.createdAt)) / 86400000);
                return (
                  <tr key={prf.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfc", borderBottom: `1px solid ${T.cardBorder}`, transition: "background .12s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")} onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbfc")}>
                    <td style={{ padding: "11px 14px", fontWeight: 600, color: T.primary }}>{prf.id}</td>
                    <td style={{ padding: "11px 14px", color: T.textMain }}>{prf.requester}</td>
                    <td style={{ padding: "11px 14px", color: T.textMain }}>{prf.vendorName}</td>
                    <td style={{ padding: "11px 14px" }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: prf.vendorStatus === "existing" ? "#34d399" : "#fb923c" }}>
                        {prf.vendorStatus === "existing" ? "Existing" : "New – Pending"}
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px" }}><StatusBadge status={prf.status} /></td>
                    <td style={{ padding: "11px 14px", color: T.textSub, fontSize: 12 }}>{prf.poNumber || "—"}</td>
                    <td style={{ padding: "11px 14px", color: ageing > 5 ? T.danger : T.textSub, fontWeight: ageing > 5 ? 600 : 400, fontSize: 12 }}>{ageing}d</td>
                    <td style={{ padding: "11px 14px" }}>
                      <button onClick={() => onSelectPrf(prf)} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: T.primaryLight, color: T.primary, border: `1px solid ${T.primary}22`, borderRadius: 6, padding: "5px 11px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                        <Icon name="eye" size={13} color={T.primary} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PRFs PAGE  (table + per-row expandable document drawer)
// ═══════════════════════════════════════════════════════════════════════════════
function PRFsPage({ prfs, onSelectPrf }) {
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showVendorPendingModal, setShowVendorPendingModal] = useState(false);
  const [emailSending, setEmailSending] = useState({});

  const filtered = filterStatus === "all" ? prfs : prfs.filter((p) => p.status === filterStatus);

  const docColor = (type) => ({ prf: T.primary, vendor: T.accent, po: "#34d399" }[type] || T.textSub);
  const docBg = (type) => ({ prf: "#dbeafe", vendor: "#fff7ed", po: "#d1fae5" }[type] || T.bg);

  // Get vendor pending PRFs
  const vendorPendingPrfs = prfs.filter((p) => p.status === "vendor_validation" || p.vendorStatus === "new_pending");

  // summary counts used by the stat row
  const stats = [
    { label: "Total PRFs", value: prfs.length, icon: "prfs", color: "#60a5fa", bg: "#dbeafe", clickable: false },
    { label: "Pending Review", value: prfs.filter((p) => p.status === "pending_review").length, icon: "clock", color: "#fb923c", bg: "#ffedd5", clickable: false },
    { label: "Vendor Pending", value: vendorPendingPrfs.length, icon: "vendors", color: "#a78bfa", bg: "#ede9fe", clickable: true, onClick: () => setShowVendorPendingModal(true) },
    { label: "PO Generated", value: prfs.filter((p) => p.status === "po_generated" || p.status === "approved").length, icon: "orders", color: "#34d399", bg: "#d1fae5", clickable: false },
  ];

  const handleSendEmail = (prf) => {
    setEmailSending(prev => ({ ...prev, [prf.id]: true }));

    // Simulate email sending
    setTimeout(() => {
      setEmailSending(prev => ({ ...prev, [prf.id]: false }));
      alert(`✓ Email sent to ${prf.requester} with VRF submission link for ${prf.vendorName}`);
    }, 1500);
  };

  const statusFilters = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "vendor_validation", label: "Vendor Validation" },
    { key: "pending_review", label: "Pending Review" },
    { key: "rejected", label: "Rejected" },
    { key: "approved", label: "Approved" },
    { key: "po_generated", label: "PO Generated" },
  ];

  return (
    <div>
      {/* ── Stat cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {stats.map((s) => (
          <Card
            key={s.label}
            style={{
              padding: 18,
              cursor: s.clickable ? "pointer" : "default",
              transition: "all .15s",
              border: s.clickable ? `2px solid ${T.cardBorder}` : `1px solid ${T.cardBorder}`,
            }}
            onClick={s.clickable ? s.onClick : undefined}
            onMouseEnter={(e) => { if (s.clickable) e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { if (s.clickable) e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, color: T.textSub, fontWeight: 500, marginBottom: 4 }}>
                  {s.label}
                  {s.clickable && <span style={{ marginLeft: 6, fontSize: 10, color: T.primary, fontWeight: 700 }}>▸ Click to view</span>}
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: T.textMain }}>{s.value}</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={s.icon} size={20} color={s.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Status filter pills ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {statusFilters.map((f) => (
          <button key={f.key} onClick={() => setFilterStatus(f.key)}
            style={{
              background: filterStatus === f.key ? T.primary : "#fff",
              color: filterStatus === f.key ? "#fff" : T.textSub,
              border: `1px solid ${filterStatus === f.key ? T.primary : T.cardBorder}`,
              borderRadius: 20, padding: "5px 14px", fontSize: 12.5,
              fontWeight: filterStatus === f.key ? 600 : 500, cursor: "pointer",
              transition: "all .15s",
            }}>
            {f.label}
            {f.key !== "all" && (
              <span style={{ marginLeft: 5, opacity: 0.75 }}>
                ({prfs.filter((p) => p.status === f.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Table + expandable doc drawers ── */}
      <Card>
        <CardHeader icon="prfs" title="Purchase Requisition Forms" action={
          <span style={{ fontSize: 12, color: T.textSub }}>{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
        } />

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: T.bg }}>
                {["", "PRF Ref No", "Requester", "Vendor Name", "Vendor Status", "Current Status", "PO Number", "Docs", "Action"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((prf, i) => {
                const isOpen = expandedId === prf.id;
                const prfDocs = prf.docs; // all docs received with / generated for this PRF
                return (
                  <>
                    {/* ── main row ── */}
                    <tr key={prf.id} style={{ background: isOpen ? "#eef4ff" : (i % 2 === 0 ? "#fff" : "#fafbfc"), borderBottom: `1px solid ${T.cardBorder}`, transition: "background .12s" }}
                      onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = "#f0f7ff"; }}
                      onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbfc"; }}>

                      {/* chevron toggle */}
                      <td style={{ padding: "11px 8px 11px 12px", width: 32 }}>
                        <button onClick={() => setExpandedId(isOpen ? null : prf.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 5, transition: "transform .18s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                          <Icon name="chevron_down" size={16} color={T.textSub} />
                        </button>
                      </td>

                      <td style={{ padding: "11px 12px", fontWeight: 600, color: T.primary }}>{prf.id}</td>
                      <td style={{ padding: "11px 12px", color: T.textMain }}>{prf.requester}</td>
                      <td style={{ padding: "11px 12px", color: T.textMain }}>{prf.vendorName}</td>
                      <td style={{ padding: "11px 12px" }}>
                        <span style={{ fontSize: 11.5, fontWeight: 600, color: prf.vendorStatus === "existing" ? "#34d399" : "#fb923c" }}>
                          {prf.vendorStatus === "existing" ? "Existing" : "New – Pending"}
                        </span>
                      </td>
                      <td style={{ padding: "11px 12px" }}><StatusBadge status={prf.status} /></td>
                      <td style={{ padding: "11px 12px", color: T.textSub, fontSize: 12 }}>{prf.poNumber || "—"}</td>

                      {/* docs pill */}
                      <td style={{ padding: "11px 12px" }}>
                        <button onClick={() => setExpandedId(isOpen ? null : prf.id)}
                          style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#f0f4f8", border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: "3px 10px", fontSize: 12, color: T.textSub, cursor: "pointer", fontWeight: 600 }}>
                          <Icon name="documents" size={13} color={T.textSub} />
                          {prfDocs.length}
                        </button>
                      </td>

                      {/* view action */}
                      <td style={{ padding: "11px 12px" }}>
                        <button onClick={() => onSelectPrf(prf)}
                          style={{ display: "inline-flex", alignItems: "center", gap: 5, background: T.primaryLight, color: T.primary, border: `1px solid ${T.primary}22`, borderRadius: 6, padding: "5px 11px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          <Icon name="eye" size={13} color={T.primary} /> View
                        </button>
                      </td>
                    </tr>

                    {/* ── expandable document drawer ── */}
                    {isOpen && (
                      <tr key={prf.id + "-docs"}>
                        <td colSpan={9} style={{ padding: 0, background: "#f7fafd", borderBottom: `2px solid ${T.primary}33` }}>
                          {/* header strip */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px 8px 48px", borderBottom: `1px solid ${T.cardBorder}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <Icon name="documents" size={15} color={T.primary} />
                              <span style={{ fontSize: 13, fontWeight: 700, color: T.textMain }}>Documents attached to {prf.id}</span>
                            </div>
                            {/* per-type mini legend */}
                            <div style={{ display: "flex", gap: 12 }}>
                              {["prf", "vendor", "po"].map((t) => {
                                const cnt = prfDocs.filter((d) => d.type === t).length;
                                if (!cnt) return null;
                                const labels = { prf: "PRF Form", vendor: "Vendor Docs", po: "Generated PO" };
                                return (
                                  <span key={t} style={{ fontSize: 11, color: docColor(t), fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: docColor(t), display: "inline-block" }} />
                                    {labels[t]} ({cnt})
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* doc grid */}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10, padding: "12px 16px 14px 48px" }}>
                            {prfDocs.map((doc, di) => (
                              <div key={di} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.cardBorder}`, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>
                                {/* colored icon box */}
                                <div style={{ width: 38, height: 38, borderRadius: 8, background: docBg(doc.type), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <Icon name="file_text" size={18} color={docColor(doc.type)} />
                                </div>
                                {/* info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: 13, fontWeight: 600, color: T.textMain, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.name}</div>
                                  <div style={{ fontSize: 11, color: T.textSub, marginTop: 1 }}>
                                    {doc.source || "—"} · {doc.uploadedAt ? fmt(doc.uploadedAt) : "—"}
                                  </div>
                                </div>
                                {/* actions */}
                                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                                  <button title="Preview" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 5 }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                                    <Icon name="eye" size={15} color={T.textSub} />
                                  </button>
                                  <button title="Download" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 5 }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                                    <Icon name="download" size={15} color={T.textSub} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Vendor Pending Modal ── */}
      {showVendorPendingModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 12, width: "100%", maxWidth: 900, maxHeight: "85vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}>
            {/* Modal Header */}
            <div style={{ padding: "20px 24px", borderBottom: `2px solid ${T.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="vendors" size={20} color="#a78bfa" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: T.textMain }}>Vendor Pending PRFs</h3>
                  <p style={{ margin: "2px 0 0", fontSize: 13, color: T.textSub }}>{vendorPendingPrfs.length} PRF{vendorPendingPrfs.length !== 1 ? "s" : ""} awaiting vendor creation</p>
                </div>
              </div>
              <button onClick={() => setShowVendorPendingModal(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                <Icon name="x" size={20} color={T.textSub} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {vendorPendingPrfs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: T.textSub }}>
                  <Icon name="check" size={48} color="#34d399" style={{ marginBottom: 12 }} />
                  <div style={{ fontSize: 16, fontWeight: 600, color: T.textMain, marginBottom: 6 }}>All Clear!</div>
                  <div style={{ fontSize: 14 }}>No PRFs are currently pending vendor creation.</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {vendorPendingPrfs.map((prf) => (
                    <Card key={prf.id} style={{ padding: 16, background: "#fafbfc" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: T.primary }}>{prf.id}</span>
                            <StatusBadge status={prf.status} />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 12px", fontSize: 13 }}>
                            <span style={{ color: T.textSub, fontWeight: 600 }}>Requester:</span>
                            <span style={{ color: T.textMain }}>{prf.requester}</span>
                            <span style={{ color: T.textSub, fontWeight: 600 }}>Vendor:</span>
                            <span style={{ color: T.textMain, fontWeight: 600 }}>{prf.vendorName}</span>
                            <span style={{ color: T.textSub, fontWeight: 600 }}>Purpose:</span>
                            <span style={{ color: T.textMain }}>{prf.purpose}</span>
                            <span style={{ color: T.textSub, fontWeight: 600 }}>Created:</span>
                            <span style={{ color: T.textMain }}>{fmt(prf.createdAt)}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 180 }}>
                          <button
                            onClick={() => handleSendEmail(prf)}
                            disabled={emailSending[prf.id]}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 6,
                              background: emailSending[prf.id] ? T.success : T.primary,
                              color: "#fff",
                              border: "none",
                              borderRadius: 7,
                              padding: "8px 14px",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: emailSending[prf.id] ? "not-allowed" : "pointer",
                              opacity: emailSending[prf.id] ? 0.7 : 1,
                              transition: "all .2s"
                            }}>
                            <Icon name={emailSending[prf.id] ? "check" : "mail"} size={15} color="#fff" />
                            {emailSending[prf.id] ? "Email Sent!" : "Send Reminder"}
                          </button>
                          <button
                            onClick={() => { setShowVendorPendingModal(false); onSelectPrf(prf); }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 6,
                              background: "#fff",
                              color: T.primary,
                              border: `1px solid ${T.primary}`,
                              borderRadius: 7,
                              padding: "8px 14px",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all .15s"
                            }}>
                            <Icon name="eye" size={15} color={T.primary} />
                            View Details
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.cardBorder}`, display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setShowVendorPendingModal(false)} style={{ background: T.bg, color: T.textMain, border: "none", borderRadius: 7, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PRF DETAIL PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function PRFDetail({ prf, onBack, onUpdatePrf }) {
  const [editing, setEditing] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [showModal, setShowModal] = useState(null); // 'approve' | 'reject' | 'edit' | 'save'
  const [editData, setEditData] = useState({
    qty: prf.qty,
    rate: prf.rate,
    glCode: prf.glCode,
    nature: prf.nature,
    dept: prf.dept,
    costCode: prf.costCode,
    project: prf.project,
    purpose: prf.purpose,
    serviceFrom: prf.servicePeriod.from,
    serviceTo: prf.servicePeriod.to,
    vendorName: prf.vendorName,
    pan: prf.pan,
    gstin: prf.gstin || "",
  });

  const canEdit = prf.status === "new";
  const isNewStatus = prf.status === "new";

  const poValueExGst = editData.qty * editData.rate;
  const gstAmount = Math.round(poValueExGst * 0.18);
  const totalPoValue = poValueExGst + gstAmount;

  const handleAction = (action) => {
    if (!remarks.trim()) return;
    const now = new Date().toISOString();
    const newRemarks = [...prf.remarks, { by: "Vivek", at: now, text: remarks || "Information updated." }];
    const newHistory = [...prf.history];
    let newStatus = prf.status;

    if (action === "approve") {
      newStatus = "approved";
      newHistory.push({ status: "Approved", at: now });
    } else if (action === "reject") {
      newStatus = "rejected";
      newHistory.push({ status: "Rejected – Action Required", at: now });
    } else if (action === "edit") {
      newStatus = "new";
      newHistory.push({ status: "New (Edited)", at: now });
    }

    const updatedPrf = {
      ...prf,
      ...editData,
      servicePeriod: { from: editData.serviceFrom, to: editData.serviceTo },
      poValueExGst,
      gstAmount,
      totalPoValue,
      status: newStatus,
      remarks: newRemarks,
      history: newHistory,
      updatedAt: now,
    };

    onUpdatePrf(updatedPrf);
    setRemarks("");
    setShowModal(null);
    setEditing(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
          <button onClick={onBack} style={{ background: "none", border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: T.textSub, fontSize: 13, flexShrink: 0 }}>
            <Icon name="arrow_left" size={15} color={T.textSub} /> Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: T.textMain, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{prf.id}</h2>
          <StatusBadge status={prf.status} />
        </div>
      </div>

      {/* Progress tracker */}
      <Card style={{ padding: "16px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {STATUS_LIFECYCLE.map((s, i) => {
            const completed = prf.history.some((h) => h.status.startsWith(s.split(" ")[0]));
            const isCurrent = prf.history[prf.history.length - 1]?.status.startsWith(s.split(" ")[0]);
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STATUS_LIFECYCLE.length - 1 ? 1 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: completed ? T.primary : T.cardBorder, border: isCurrent ? `3px solid ${T.primary}` : "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isCurrent ? `0 0 0 3px ${T.primary}33` : "none", transition: "all .2s" }}>
                    {completed && <Icon name="check" size={15} color="#fff" />}
                  </div>
                  <span style={{ fontSize: 10, marginTop: 6, color: completed ? T.primary : T.textSub, fontWeight: completed ? 600 : 400, textAlign: "center", maxWidth: 70, lineHeight: 1.3 }}>{s}</span>
                </div>
                {i < STATUS_LIFECYCLE.length - 1 && <div style={{ flex: 1, height: 2, background: completed ? T.primary : T.cardBorder, margin: "0 2px", marginBottom: 22 }} />}
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* PRF Info (editable for 'new' status) */}
          <Card>
            <CardHeader icon="file_text" title="PRF Information" action={
              !editing && isNewStatus && (
                <button onClick={() => setEditing(true)} style={{ background: "none", border: `1px solid ${T.cardBorder}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, color: T.textSub, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="edit" size={13} color={T.textSub} /> Edit this PRF
                </button>
              )
            } />
            <div style={{ padding: "0 20px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {editing && isNewStatus ? (
                <>
                  {[
                    { key: "dept", label: "Department", type: "text" },
                    { key: "costCode", label: "Cost Code", type: "text" },
                    { key: "project", label: "Project / University", type: "text", span: 2 },
                    { key: "purpose", label: "Purpose", type: "text", span: 2 },
                    { key: "serviceFrom", label: "Service From", type: "date" },
                    { key: "serviceTo", label: "Service To", type: "date" },
                  ].map((f) => (
                    <div key={f.key} style={{ gridColumn: f.span ? `span ${f.span}` : "auto" }}>
                      <label style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" }}>{f.label}</label>
                      <input type={f.type} value={editData[f.key]} onChange={(e) => setEditData({ ...editData, [f.key]: e.target.value })} style={{ width: "100%", marginTop: 4, padding: "7px 10px", border: `1px solid ${T.primary}`, borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" }} />
                    </div>
                  ))}
                </>
              ) : (
                [
                  ["Department", editData.dept],
                  ["Cost Code", editData.costCode],
                  ["Project / University", editData.project],
                  ["Purpose", editData.purpose],
                  ["Service From", fmt(editData.serviceFrom)],
                  ["Service To", fmt(editData.serviceTo)],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 13.5, color: T.textMain, fontWeight: 500 }}>{val}</div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Vendor Info (editable for 'new' status) */}
          <Card>
            <CardHeader icon="vendors" title="Vendor Information" />
            <div style={{ padding: "0 20px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {editing && isNewStatus ? (
                [
                  { key: "vendorName", label: "Vendor Name", type: "text" },
                  { key: "pan", label: "PAN", type: "text" },
                  { key: "gstin", label: "GSTIN", type: "text", span: 2 },
                ].map((f) => (
                  <div key={f.key} style={{ gridColumn: f.span ? `span ${f.span}` : "auto" }}>
                    <label style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" }}>{f.label}</label>
                    <input type={f.type} value={editData[f.key]} onChange={(e) => setEditData({ ...editData, [f.key]: e.target.value })} style={{ width: "100%", marginTop: 4, padding: "7px 10px", border: `1px solid ${T.primary}`, borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" }} />
                  </div>
                ))
              ) : (
                [
                  ["Vendor Name", editData.vendorName],
                  ["Vendor Code", prf.vendorCode || "—"],
                  ["PAN", editData.pan],
                  ["GSTIN", editData.gstin || "—"],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 13.5, color: T.textMain, fontWeight: 500 }}>{val}</div>
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: "0 20px 14px", display: "flex", gap: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: prf.vendorStatus === "existing" ? "#16a34a" : "#d97706", background: prf.vendorStatus === "existing" ? "#dcfce7" : "#fef3c7", padding: "3px 10px", borderRadius: 12 }}>
                {prf.vendorStatus === "existing" ? "✓ Existing Vendor" : "⏳ VRF / VIF Pending"}
              </span>
            </div>
          </Card>

          {/* Financial Details (editable) */}
          <Card>
            <CardHeader icon="orders" title="Financial Details" action={
              !editing && canEdit && !isNewStatus && (
                <button onClick={() => setEditing(true)} style={{ background: "none", border: `1px solid ${T.cardBorder}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, color: T.textSub, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <Icon name="edit" size={13} color={T.textSub} /> Edit
                </button>
              )
            } />
            <div style={{ padding: "0 20px 18px" }}>
              {editing ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px" }}>
                  {[
                    { key: "qty", label: "Quantity", type: "number" },
                    { key: "rate", label: "Rate (₹)", type: "number" },
                    { key: "glCode", label: "GL Code", type: "text" },
                    { key: "nature", label: "Nature of Expense", type: "text" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" }}>{f.label}</label>
                      <input type={f.type} value={editData[f.key]} onChange={(e) => setEditData({ ...editData, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} style={{ width: "100%", marginTop: 4, padding: "7px 10px", border: `1px solid ${T.primary}`, borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  {[
                    ["Quantity", prf.qty],
                    ["Rate", rupee(prf.rate)],
                    ["GL Code", prf.glCode],
                    ["Nature", prf.nature],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 13.5, color: T.textMain, fontWeight: 500 }}>{val}</div>
                    </div>
                  ))}
                </div>
              )}
              {/* Totals */}
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${T.cardBorder}`, display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["PO Value (excl. GST)", editing ? poValueExGst : prf.poValueExGst, false],
                  ["GST Amount (18%)", editing ? gstAmount : prf.gstAmount, false],
                  ["Total PO Value", editing ? totalPoValue : prf.totalPoValue, true],
                ].map(([label, val, bold]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: bold ? 14 : 13, fontWeight: bold ? 700 : 500, color: bold ? T.textMain : T.textSub }}>
                    <span>{label}</span>
                    <span style={{ color: bold ? T.primary : T.textMain }}>{rupee(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Action Panel */}
          <Card>
            <CardHeader icon="check" title="Action Panel" />
            <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
              {isNewStatus && (
                <>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => { if (editing) setShowModal("edit"); else setShowModal("approve"); }} style={{ flex: editing ? 1 : 1, background: editing ? T.primary : T.primary, color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      {editing ? "Save Edit" : "Approve"}
                    </button>
                    <button onClick={() => setShowModal("reject")} style={{ flex: 1, background: "#fff", color: T.danger, border: `1px solid ${T.danger}`, borderRadius: 7, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      Reject
                    </button>
                  </div>
                  {editing ? (
                    <button onClick={() => setEditing(false)} style={{ background: "none", border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "7px 0", fontSize: 12.5, color: T.textSub, cursor: "pointer" }}>
                      Cancel Edit
                    </button>
                  ) : (
                    <button onClick={() => setEditing(true)} style={{ background: "none", border: `1px solid ${T.primary}`, borderRadius: 7, padding: "7px 0", fontSize: 12.5, color: T.primary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <Icon name="edit" size={13} color={T.primary} /> Edit this PRF
                    </button>
                  )}
                </>
              )}
              {!canEdit && (
                <div style={{ fontSize: 13, color: T.textSub, textAlign: "center", padding: "12px 0" }}>No actions available for current status.</div>
              )}
              {/* Remarks (mandatory for New actions) */}
              {isNewStatus && (
                <div style={{ marginTop: 6 }}>
                  <label style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" }}>Remarks <span style={{ color: T.danger }}>*</span></label>
                  <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Add mandatory remarks…" rows={3} style={{ width: "100%", marginTop: 5, padding: "8px 10px", border: `1px solid ${T.cardBorder}`, borderRadius: 7, fontSize: 13, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
              )}
            </div>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader icon="documents" title="Documents" />
            <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
              {prf.docs.map((doc, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 7, border: `1px solid ${T.cardBorder}`, background: T.bg }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="file_text" size={16} color={doc.type === "po" ? T.success : doc.type === "prf" ? T.primary : T.accent} />
                    <span style={{ fontSize: 13, color: T.textMain, fontWeight: 500 }}>{doc.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon name="eye" size={15} color={T.textSub} /></button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon name="download" size={15} color={T.textSub} /></button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Audit Trail */}
          <Card>
            <CardHeader icon="clock" title="Audit Trail" />
            <div style={{ padding: "0 20px 18px" }}>
              {prf.remarks.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < prf.remarks.length - 1 ? 14 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: r.by === "System" ? T.bg : T.primaryLight, border: `2px solid ${r.by === "System" ? T.cardBorder : T.primary}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {r.by === "System" ? <Icon name="sync" size={12} color={T.textSub} /> : <Icon name="user" size={12} color={T.primary} />}
                    </div>
                    {i < prf.remarks.length - 1 && <div style={{ width: 2, flex: 1, background: T.cardBorder, minHeight: 20 }} />}
                  </div>
                  <div style={{ paddingBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: r.by === "System" ? T.textSub : T.primary }}>{r.by}</span>
                      <span style={{ fontSize: 10.5, color: T.textSub }}>{fmtTime(r.at)}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: T.textMain, marginTop: 2 }}>{r.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "#fff", borderRadius: 12, width: 420, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: 17, color: T.textMain }}>
              {showModal === "approve" ? "Approve PRF" : showModal === "reject" ? "Reject PRF" : showModal === "save" ? "Save & Submit PRF" : "Save Edits"}
            </h3>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: T.textSub }}>
              {showModal === "approve"
                ? "This will approve the PRF and trigger PO generation."
                : showModal === "reject"
                  ? "The requester will be notified via email."
                  : showModal === "save"
                    ? "PRF will be submitted for vendor validation. You won't be able to edit after submission."
                    : "Edited details will be saved and status remains Pending Review."}
            </p>
            {showModal !== "save" && !remarks.trim() && <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 7, padding: "8px 12px", fontSize: 12.5, color: "#92400e", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Icon name="alert" size={14} color="#92400e" /> Remarks are mandatory.</div>}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button onClick={() => setShowModal(null)} style={{ background: "#f3f4f6", border: "none", borderRadius: 7, padding: "8px 18px", fontSize: 13, cursor: "pointer", color: T.textSub }}>Cancel</button>
              <button
                onClick={() => handleAction(showModal)}
                disabled={showModal !== "save" && !remarks.trim()}
                style={{
                  background: showModal === "reject" ? T.danger : T.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 7,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: (showModal === "save" || remarks.trim()) ? "pointer" : "not-allowed",
                  opacity: (showModal === "save" || remarks.trim()) ? 1 : 0.5
                }}>
                {showModal === "approve" ? "Confirm Approval" : showModal === "reject" ? "Confirm Rejection" : showModal === "save" ? "Submit PRF" : "Confirm Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  VENDORS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function VendorsPage({ onSelectVendor }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters
  let filtered = MOCK_VENDORS;
  if (statusFilter !== "all") {
    filtered = filtered.filter((v) => v.status === statusFilter);
  }
  if (typeFilter !== "all") {
    filtered = filtered.filter((v) => v.type === typeFilter);
  }

  return (
    <div>
      {/* Filter Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, gap: 12, flexWrap: "wrap" }}>
        {/* Status filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {["all", "active", "approval_pending", "pending_requester", "pending_sage", "created"].map((f) => (
            <button key={f} onClick={() => setStatusFilter(f)} style={{ background: statusFilter === f ? T.primary : "#fff", color: statusFilter === f ? "#fff" : T.textSub, border: `1px solid ${statusFilter === f ? T.primary : T.cardBorder}`, borderRadius: 7, padding: "6px 14px", fontSize: 13, fontWeight: statusFilter === f ? 600 : 500, cursor: "pointer", transition: "all .15s" }}>
              {f === "all" ? "All" : VENDOR_STATUS_MAP[f]?.label || f}
            </button>
          ))}
        </div>

        {/* Filters Button */}
        <button onClick={() => setShowFilters(!showFilters)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: showFilters ? T.primary : "#fff", color: showFilters ? "#fff" : T.primary, border: `1px solid ${T.primary}`, borderRadius: 7, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .15s" }}>
          <Icon name="filter" size={16} color={showFilters ? "#fff" : T.primary} />
          Filters {showFilters ? "▲" : "▼"}
        </button>
      </div>

      {/* Expandable Filters Panel */}
      {showFilters && (
        <Card style={{ padding: "18px 20px", marginBottom: 18, background: "#f7fafd" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
            {/* Type Filter */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.textMain, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <Icon name="vendors" size={14} color={T.primary} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                Filter by Type
              </div>
              <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                {["all", "Teamlease Edtech", "Teamlease Foundation", "AIF"].map((type) => (
                  <label key={type} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 10px", borderRadius: 6, background: typeFilter === type ? T.primaryLight : "#fff", border: `1px solid ${typeFilter === type ? T.primary : T.cardBorder}`, transition: "all .15s" }}>
                    <input
                      type="radio"
                      name="typeFilter"
                      checked={typeFilter === type}
                      onChange={() => setTypeFilter(type)}
                      style={{ cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 13, fontWeight: typeFilter === type ? 600 : 400, color: typeFilter === type ? T.primary : T.textMain }}>
                      {type === "all" ? "All Types" : type}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Vendor Table */}
      <Card>
        <CardHeader icon="vendors" title="Vendor Master" action={
          <span style={{ fontSize: 12, color: T.textSub }}>{filtered.length} vendor{filtered.length !== 1 ? "s" : ""}</span>
        } />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: T.bg }}>
                <th style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>Vendor Name</th>
                <th style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>Vendor Code</th>
                <th style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>Type</th>
                <th style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>GST</th>
                <th style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>Bank</th>
                <th style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>Status</th>
                <th style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}`, whiteSpace: "nowrap" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => {
                const statusInfo = VENDOR_STATUS_MAP[v.status];
                return (
                  <tr key={v.name} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfc", borderBottom: `1px solid ${T.cardBorder}`, transition: "background .12s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbfc")}>
                    <td style={{ padding: "11px 16px", color: T.textMain, fontWeight: 500 }}>{v.name}</td>
                    <td style={{ padding: "11px 16px", fontWeight: 600, color: T.primary }}>{v.code || "—"}</td>
                    <td style={{ padding: "11px 16px", color: T.textSub, fontSize: 12 }}>{v.type}</td>
                    <td style={{ padding: "11px 16px", color: T.textSub, fontFamily: "monospace", fontSize: 12 }}>{v.gstin || "—"}</td>
                    <td style={{ padding: "11px 16px", color: T.textMain }}>{v.bankName || "—"}</td>
                    <td style={{ padding: "11px 16px" }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: statusInfo?.color, background: statusInfo?.bg, padding: "3px 10px", borderRadius: 12 }}>
                        {statusInfo?.label}
                      </span>
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      {(v.status === "approval_pending" || v.status === "pending_requester") && (
                        <button onClick={() => onSelectVendor(v)} style={{ background: T.primaryLight, color: T.primary, border: `1px solid ${T.primary}22`, borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <Icon name="eye" size={13} color={T.primary} /> View
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  VENDOR DETAIL PAGE (for approval/rejection workflow)
// ═══════════════════════════════════════════════════════════════════════════════
function VendorDetail({ vendor, onBack, onUpdateVendor }) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...vendor });
  const [showModal, setShowModal] = useState(null); // 'approve' | 'reject'
  const [comment, setComment] = useState("");

  const canEdit = vendor.status === "approval_pending";
  const canApprove = vendor.status === "approval_pending";

  const handleAction = (action) => {
    if (action === "approve") {
      if (editing) {
        // Save edits first
        onUpdateVendor({ ...editData, remarks: [...(editData.remarks || []), { by: "Vivek", at: new Date().toISOString(), text: "Vendor details updated." }] });
        setEditing(false);
      }
      // Approve and submit to SAGE
      onUpdateVendor({
        ...editData,
        status: "pending_sage",
        remarks: [...(editData.remarks || []), { by: "Vivek", at: new Date().toISOString(), text: comment || "Vendor approved and submitted to SAGE." }]
      });
      setShowModal(null);
      alert("Vendor approved and submitted to SAGE!");
    } else if (action === "reject") {
      if (!comment.trim()) {
        alert("Comment is mandatory for rejection!");
        return;
      }
      onUpdateVendor({
        ...vendor,
        status: "pending_requester",
        remarks: [...(vendor.remarks || []), { by: "Vivek", at: new Date().toISOString(), text: `Rejected: ${comment}` }]
      });
      setShowModal(null);
      alert("Vendor rejected. Requester will be notified.");
    } else if (action === "edit") {
      // Save edits
      onUpdateVendor({
        ...editData,
        remarks: [...(editData.remarks || []), { by: "Vivek", at: new Date().toISOString(), text: "Vendor details updated." }]
      });
      setEditing(false);
      setShowModal(null);
    }
  };

  const statusInfo = VENDOR_STATUS_MAP[vendor.status];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <button onClick={onBack} style={{ background: "none", border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: T.textSub, fontSize: 13 }}>
          <Icon name="arrow_left" size={15} color={T.textSub} /> Back
        </button>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: T.textMain }}>Vendor Detail – {vendor.name}</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, alignItems: "start" }}>
        {/* Left column - Vendor Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card>
            <CardHeader icon="vendors" title="Vendor Information" action={
              <span style={{ fontSize: 11.5, fontWeight: 600, color: statusInfo?.color, background: statusInfo?.bg, padding: "3px 10px", borderRadius: 12 }}>
                {statusInfo?.label}
              </span>
            } />
            <div style={{ padding: "0 20px 18px" }}>
              {editing ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  {[
                    { label: "Vendor Name", key: "name", type: "text" },
                    { label: "New Vendor Name", key: "newVendorName", type: "text" },
                    { label: "PAN", key: "pan", type: "text" },
                    { label: "GSTIN", key: "gstin", type: "text" },
                    { label: "Contact Name", key: "contactName", type: "text" },
                    { label: "Contact Email", key: "contactEmail", type: "email" },
                    { label: "Contact Phone", key: "contactPhone", type: "text" },
                    { label: "Type", key: "type", type: "text" },
                  ].map((f) => (
                    <div key={f.key}>
                      <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 2 }}>{f.label}</div>
                      <input type={f.type} value={editData[f.key] || ""} onChange={(e) => setEditData({ ...editData, [f.key]: e.target.value })} style={{ width: "100%", marginTop: 4, padding: "7px 10px", border: `1px solid ${T.primary}`, borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  {[
                    ["Vendor Name", vendor.name],
                    ["New Vendor Name", vendor.newVendorName],
                    ["PAN", vendor.pan],
                    ["GSTIN", vendor.gstin || "—"],
                    ["Contact Name", vendor.contactName || "—"],
                    ["Contact Email", vendor.contactEmail || "—"],
                    ["Contact Phone", vendor.contactPhone || "—"],
                    ["Type", vendor.type],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 13.5, color: T.textMain, fontWeight: 500 }}>{val}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader icon="bank" title="Bank Details" />
            <div style={{ padding: "0 20px 18px" }}>
              {editing ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  {[
                    { label: "Bank Name", key: "bankName", type: "text" },
                    { label: "Account Number", key: "bankAccountNo", type: "text" },
                    { label: "IFSC Code", key: "ifscCode", type: "text" },
                    { label: "MSME Reg No.", key: "msmeRegNo", type: "text" },
                    { label: "Type of Enterprise", key: "typeOfEnterprise", type: "text" },
                    { label: "Major Activity", key: "majorActivity", type: "text" },
                  ].map((f) => (
                    <div key={f.key}>
                      <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 2 }}>{f.label}</div>
                      <input type={f.type} value={editData[f.key] || ""} onChange={(e) => setEditData({ ...editData, [f.key]: e.target.value })} style={{ width: "100%", marginTop: 4, padding: "7px 10px", border: `1px solid ${T.primary}`, borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  {[
                    ["Bank Name", vendor.bankName || "—"],
                    ["Account Number", vendor.bankAccountNo || "—"],
                    ["IFSC Code", vendor.ifscCode || "—"],
                    ["MSME Reg No.", vendor.msmeRegNo || "—"],
                    ["Type of Enterprise", vendor.typeOfEnterprise || "—"],
                    ["Major Activity", vendor.majorActivity || "—"],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 13.5, color: T.textMain, fontWeight: 500 }}>{val}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Action Panel */}
          <Card>
            <CardHeader icon="check" title="Action Panel" />
            <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
              {canApprove && (
                <>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => { if (editing) setShowModal("edit"); else setShowModal("approve"); }} style={{ flex: 1, background: editing ? T.primary : T.primary, color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      {editing ? "Save Edit" : "Approve"}
                    </button>
                    <button onClick={() => setShowModal("reject")} style={{ flex: 1, background: "#fff", color: T.danger, border: `1px solid ${T.danger}`, borderRadius: 7, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      Reject
                    </button>
                  </div>
                  {editing ? (
                    <button onClick={() => setEditing(false)} style={{ background: "none", border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "7px 0", fontSize: 12.5, color: T.textSub, cursor: "pointer" }}>
                      Cancel Edit
                    </button>
                  ) : (
                    <button onClick={() => setEditing(true)} style={{ background: "none", border: `1px solid ${T.primary}`, borderRadius: 7, padding: "7px 0", fontSize: 12.5, color: T.primary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <Icon name="edit" size={13} color={T.primary} /> Edit Vendor Details
                    </button>
                  )}
                </>
              )}
              {!canApprove && (
                <div style={{ fontSize: 13, color: T.textSub, textAlign: "center", padding: "12px 0" }}>No actions available for current status.</div>
              )}
            </div>
          </Card>

          {/* Documents */}
          {vendor.docs && vendor.docs.length > 0 && (
            <Card>
              <CardHeader icon="documents" title="Documents" />
              <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                {vendor.docs.map((doc, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 7, border: `1px solid ${T.cardBorder}`, background: T.bg }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon name="file_text" size={16} color={T.primary} />
                      <span style={{ fontSize: 13, color: T.textMain, fontWeight: 500 }}>{doc.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon name="eye" size={15} color={T.textSub} /></button>
                      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon name="download" size={15} color={T.textSub} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Audit Trail */}
          {vendor.remarks && vendor.remarks.length > 0 && (
            <Card>
              <CardHeader icon="clock" title="Audit Trail" />
              <div style={{ padding: "0 20px 18px" }}>
                {vendor.remarks.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < vendor.remarks.length - 1 ? 14 : 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: r.by === "System" ? T.bg : T.primaryLight, border: `2px solid ${r.by === "System" ? T.cardBorder : T.primary}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {r.by === "System" ? <Icon name="sync" size={12} color={T.textSub} /> : <Icon name="user" size={12} color={T.primary} />}
                      </div>
                      {i < vendor.remarks.length - 1 && <div style={{ width: 2, flex: 1, background: T.cardBorder, minHeight: 20 }} />}
                    </div>
                    <div style={{ paddingBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: r.by === "System" ? T.textSub : T.primary }}>{r.by}</span>
                        <span style={{ fontSize: 10.5, color: T.textSub }}>{fmtTime(r.at)}</span>
                      </div>
                      <div style={{ fontSize: 12.5, color: T.textMain, marginTop: 2 }}>{r.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "#fff", borderRadius: 12, width: 420, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: 17, color: T.textMain }}>
              {showModal === "approve" ? "Approve Vendor" : showModal === "reject" ? "Reject Vendor" : "Save Edits"}
            </h3>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: T.textSub }}>
              {showModal === "approve"
                ? "This will approve the vendor and submit details to SAGE for creation."
                : showModal === "reject"
                  ? "The requester will be notified to resubmit the VIF form."
                  : "Edited details will be saved."}
            </p>
            {showModal !== "edit" && (
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                  Comment {showModal === "reject" && <span style={{ color: T.danger }}>*</span>}
                </label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={showModal === "reject" ? "Reason for rejection (mandatory)" : "Optional comment"} rows={3} style={{ width: "100%", marginTop: 5, padding: "8px 10px", border: `1px solid ${T.cardBorder}`, borderRadius: 7, fontSize: 13, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
            )}
            {showModal === "reject" && !comment.trim() && <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 7, padding: "8px 12px", fontSize: 12.5, color: "#92400e", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Icon name="alert" size={14} color="#92400e" /> Comment is mandatory for rejection.</div>}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button onClick={() => setShowModal(null)} style={{ background: "#f3f4f6", border: "none", borderRadius: 7, padding: "8px 18px", fontSize: 13, cursor: "pointer", color: T.textSub }}>Cancel</button>
              <button
                onClick={() => handleAction(showModal)}
                disabled={showModal === "reject" && !comment.trim()}
                style={{
                  background: showModal === "reject" ? T.danger : T.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 7,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: (showModal === "reject" && !comment.trim()) ? "not-allowed" : "pointer",
                  opacity: (showModal === "reject" && !comment.trim()) ? 0.5 : 1
                }}>
                {showModal === "approve" ? "Confirm Approval" : showModal === "reject" ? "Confirm Rejection" : "Confirm Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PURCHASE ORDERS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function PurchaseOrdersPage({ prfs }) {
  const [selectedPO, setSelectedPO] = useState(null);
  const posData = prfs.filter((p) => p.poNumber);

  if (selectedPO) {
    return <POPreview po={selectedPO} onBack={() => setSelectedPO(null)} />;
  }
  return (
    <div>
      <Card>
        <CardHeader icon="orders" title="Generated Purchase Orders" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: T.bg }}>
                {["PO Number", "PRF Ref", "Vendor Name", "PO Value (incl GST)", "PO Date", "SAGE Sync", "Action"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${T.cardBorder}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posData.map((po, i) => (
                <tr key={po.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfc", borderBottom: `1px solid ${T.cardBorder}` }}>
                  <td style={{ padding: "11px 16px", fontWeight: 700, color: T.primary }}>{po.poNumber}</td>
                  <td style={{ padding: "11px 16px", color: T.textSub }}>{po.id}</td>
                  <td style={{ padding: "11px 16px", color: T.textMain }}>{po.vendorName}</td>
                  <td style={{ padding: "11px 16px", color: T.textMain, fontWeight: 600 }}>{rupee(po.totalPoValue)}</td>
                  <td style={{ padding: "11px 16px", color: T.textSub }}>{fmt(po.poDate)}</td>
                  <td style={{ padding: "11px 16px" }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: "#16a34a", background: "#dcfce7", padding: "3px 10px", borderRadius: 12, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Icon name="check" size={11} color="#16a34a" /> Synced
                    </span>
                  </td>
                  <td style={{ padding: "11px 16px", display: "flex", gap: 6 }}>
                    <button onClick={() => setSelectedPO(po)} style={{ background: T.primaryLight, color: T.primary, border: `1px solid ${T.primary}22`, borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Icon name="eye" size={13} color={T.primary} /> Preview
                    </button>
                    <button style={{ background: "#fff", color: T.textSub, border: `1px solid ${T.cardBorder}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Icon name="download" size={13} color={T.textSub} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// PO Preview
function POPreview({ po, onBack }) {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <button onClick={onBack} style={{ background: "none", border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: T.textSub, fontSize: 13 }}>
          <Icon name="arrow_left" size={15} color={T.textSub} /> Back
        </button>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: T.textMain }}>PO Preview – {po.poNumber}</h2>
      </div>
      <Card style={{ padding: 28 }}>
        {/* PO Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, paddingBottom: 20, borderBottom: `2px solid ${T.cardBorder}` }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: T.primary }}>PURCHASE ORDER</div>
            <div style={{ fontSize: 13, color: T.textSub, marginTop: 4 }}>PRF Ref: {po.id}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.textMain }}>{po.poNumber}</div>
            <div style={{ fontSize: 12, color: T.textSub }}>Date: {fmt(po.poDate)}</div>
            <div style={{ marginTop: 6 }}><StatusBadge status={po.status} /></div>
          </div>
        </div>
        {/* Vendor & Details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>Vendor Details</div>
            {[["Name", po.vendorName], ["Code", po.vendorCode], ["PAN", po.pan], ["GSTIN", po.gstin]].map(([k, v]) => (
              <div key={k} style={{ fontSize: 13, color: T.textMain, marginBottom: 3 }}><span style={{ color: T.textSub, fontWeight: 600 }}>{k}:</span> {v || "—"}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>Order Details</div>
            {[["Department", po.dept], ["Cost Code", po.costCode], ["GL Code", po.glCode], ["Nature", po.nature], ["Purpose", po.purpose]].map(([k, v]) => (
              <div key={k} style={{ fontSize: 13, color: T.textMain, marginBottom: 3 }}><span style={{ color: T.textSub, fontWeight: 600 }}>{k}:</span> {v}</div>
            ))}
          </div>
        </div>
        {/* Line Items */}
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 10 }}>Line Items</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 0 }}>
          <thead>
            <tr style={{ background: T.bg }}>
              {["#", "Description", "Qty", "Rate", "Amount"].map((h) => (
                <th key={h} style={{ textAlign: h === "Qty" || h === "Rate" || h === "Amount" || h === "#" ? "right" : "left", padding: "8px 12px", fontSize: 11, fontWeight: 600, color: T.textSub, borderBottom: `1px solid ${T.cardBorder}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${T.cardBorder}` }}>
              <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSub }}>1</td>
              <td style={{ padding: "10px 12px", color: T.textMain }}>{po.purpose}</td>
              <td style={{ padding: "10px 12px", textAlign: "right", color: T.textMain }}>{po.qty}</td>
              <td style={{ padding: "10px 12px", textAlign: "right", color: T.textMain }}>{rupee(po.rate)}</td>
              <td style={{ padding: "10px 12px", textAlign: "right", color: T.textMain, fontWeight: 600 }}>{rupee(po.poValueExGst)}</td>
            </tr>
          </tbody>
        </table>
        {/* Tax Summary */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <div style={{ width: 280 }}>
            {[
              ["Subtotal", po.poValueExGst],
              ["GST (18%)", po.gstAmount],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13, color: T.textSub }}>
                <span>{l}</span><span>{rupee(v)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", marginTop: 6, borderTop: `2px solid ${T.primary}`, fontSize: 15, fontWeight: 700, color: T.textMain }}>
              <span>Total</span><span style={{ color: T.primary }}>{rupee(po.totalPoValue)}</span>
            </div>
          </div>
        </div>
        {/* Service period & footer actions */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.cardBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: T.textSub }}>Service Period: <strong>{fmt(po.servicePeriod.from)}</strong> – <strong>{fmt(po.servicePeriod.to)}</strong></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ background: "#fff", border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "7px 14px", fontSize: 12.5, color: T.textSub, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Icon name="folder" size={14} color={T.textSub} /> Google Drive
            </button>
            <button style={{ background: T.primary, color: "#fff", border: "none", borderRadius: 7, padding: "7px 16px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Icon name="download" size={14} color="#fff" /> Download PO
            </button>
          </div>
        </div>
      </Card>
      {/* SAGE Status card */}
      <Card style={{ marginTop: 14, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="sync" size={18} color="#16a34a" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.textMain }}>SAGE Integration</div>
          <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>✓ PO synced to SAGE successfully</div>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DOCUMENTS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function DocumentsPage({ prfs }) {
  const allDocs = prfs.flatMap((p) => p.docs.map((d) => ({ ...d, prf: p.id, vendorName: p.vendorName })));
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
        {[
          { label: "PRF Documents", count: allDocs.filter((d) => d.type === "prf").length, color: T.primary, icon: "file_text" },
          { label: "Vendor Documents", count: allDocs.filter((d) => d.type === "vendor").length, color: T.accent, icon: "documents" },
          { label: "Generated POs", count: allDocs.filter((d) => d.type === "po").length, color: "#34d399", icon: "orders" },
        ].map((s) => (
          <Card key={s.label} style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={s.icon} size={20} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: T.textSub }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: T.textMain }}>{s.count}</div>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader icon="documents" title="All Documents" />
        <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
          {allDocs.map((doc, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 8, border: `1px solid ${T.cardBorder}`, background: i % 2 === 0 ? "#fff" : T.bg }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: doc.type === "po" ? "#d1fae5" : doc.type === "prf" ? "#dbeafe" : "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="file_text" size={17} color={doc.type === "po" ? "#16a34a" : doc.type === "prf" ? T.primary : T.accent} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.textMain }}>{doc.name}</div>
                  <div style={{ fontSize: 11.5, color: T.textSub }}>PRF: {doc.prf} · {doc.vendorName}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ background: T.primaryLight, color: T.primary, border: `1px solid ${T.primary}22`, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Icon name="eye" size={13} color={T.primary} /> View
                </button>
                <button style={{ background: "#fff", color: T.textSub, border: `1px solid ${T.cardBorder}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Icon name="download" size={13} color={T.textSub} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}



// ═══════════════════════════════════════════════════════════════════════════════
//  VRF / VIF SUBMISSION PAGE (for new vendors)
// ═══════════════════════════════════════════════════════════════════════════════
function VRFPage({ prf, onBack }) {
  const [step, setStep] = useState(0); // 0=basic, 1=bank, 2=tax, 3=review
  const [formData, setFormData] = useState({ vendorName: prf.vendorName, contactName: "", contactEmail: "", contactPhone: "", bankName: "", accountNo: "", ifsc: "", pan: prf.pan, gstin: "", msme: false });
  const steps = ["Basic Details", "Bank Details", "PAN / GST & MSME", "Review & Submit"];
  const update = (k, v) => setFormData((prev) => ({ ...prev, [k]: v }));
  const inputStyle = { width: "100%", padding: "8px 10px", border: `1px solid ${T.cardBorder}`, borderRadius: 7, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" };
  const labelStyle = { fontSize: 11, color: T.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", display: "block", marginBottom: 4 };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <button onClick={onBack} style={{ background: "none", border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: T.textSub, fontSize: 13 }}>
          <Icon name="arrow_left" size={15} color={T.textSub} /> Back
        </button>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: T.textMain }}>VRF / VIF Submission</h2>
      </div>
      {/* Step indicator */}
      <div style={{ display: "flex", gap: 0, marginBottom: 22 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: i <= step ? T.primary : T.cardBorder, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i < step ? <Icon name="check" size={14} color="#fff" /> : <span style={{ fontSize: 12, color: i === step ? "#fff" : T.textSub, fontWeight: 700 }}>{i + 1}</span>}
              </div>
              <span style={{ fontSize: 10, marginTop: 4, color: i <= step ? T.primary : T.textSub, textAlign: "center", maxWidth: 70, fontWeight: i === step ? 600 : 400 }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? T.primary : T.cardBorder, margin: "0 3px", marginBottom: 22 }} />}
          </div>
        ))}
      </div>
      <Card style={{ padding: 24 }}>
        {step === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1/-1" }}><label style={labelStyle}>Vendor Name</label><input value={formData.vendorName} disabled style={{ ...inputStyle, background: "#f3f4f6", color: T.textSub }} /></div>
            <div><label style={labelStyle}>Contact Name</label><input value={formData.contactName} onChange={(e) => update("contactName", e.target.value)} style={inputStyle} placeholder="Full name" /></div>
            <div><label style={labelStyle}>Contact Email</label><input value={formData.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} style={inputStyle} placeholder="email@vendor.com" /></div>
            <div style={{ gridColumn: "1/-1" }}><label style={labelStyle}>Contact Phone</label><input value={formData.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} style={inputStyle} placeholder="+91 …" /></div>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1/-1" }}><label style={labelStyle}>Bank Name</label><input value={formData.bankName} onChange={(e) => update("bankName", e.target.value)} style={inputStyle} placeholder="e.g. HDFC Bank" /></div>
            <div><label style={labelStyle}>Account Number</label><input value={formData.accountNo} onChange={(e) => update("accountNo", e.target.value)} style={inputStyle} placeholder="12-digit account no." /></div>
            <div><label style={labelStyle}>IFSC Code</label><input value={formData.ifsc} onChange={(e) => update("ifsc", e.target.value)} style={inputStyle} placeholder="e.g. HDFC0000001" /></div>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div><label style={labelStyle}>PAN Number</label><input value={formData.pan} disabled style={{ ...inputStyle, background: "#f3f4f6", color: T.textSub }} /></div>
            <div><label style={labelStyle}>GSTIN</label><input value={formData.gstin} onChange={(e) => update("gstin", e.target.value)} style={inputStyle} placeholder="18-char GSTIN" /></div>
            <div style={{ gridColumn: "1/-1", display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <input type="checkbox" checked={formData.msme} onChange={(e) => update("msme", e.target.checked)} id="msme" style={{ width: 18, height: 18, cursor: "pointer" }} />
              <label htmlFor="msme" style={{ fontSize: 13, color: T.textMain, cursor: "pointer" }}>This vendor is MSME registered</label>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.textMain, marginBottom: 14 }}>Review your details before submission:</div>
            {[
              ["Vendor Name", formData.vendorName], ["Contact", formData.contactName || "—"], ["Email", formData.contactEmail || "—"],
              ["Phone", formData.contactPhone || "—"], ["Bank", formData.bankName || "—"], ["Account", formData.accountNo || "—"],
              ["IFSC", formData.ifsc || "—"], ["PAN", formData.pan], ["GSTIN", formData.gstin || "—"], ["MSME", formData.msme ? "Yes" : "No"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", padding: "6px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 12.5, color: T.textSub, width: 110, flexShrink: 0 }}>{k}</span>
                <span style={{ fontSize: 12.5, color: T.textMain, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        )}
        {/* Nav buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, paddingTop: 16, borderTop: `1px solid ${T.cardBorder}` }}>
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} style={{ background: "#fff", border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "8px 18px", fontSize: 13, cursor: step === 0 ? "not-allowed" : "pointer", color: T.textSub, opacity: step === 0 ? 0.5 : 1 }}>Previous</button>
          <button onClick={() => { if (step < 3) setStep((s) => s + 1); else alert("VRF submitted successfully! Portal will validate and forward to SAGE."); }} style={{ background: T.primary, color: "#fff", border: "none", borderRadius: 7, padding: "8px 22px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {step < 3 ? "Next →" : "Submit VRF"}
          </button>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedPrf, setSelectedPrf] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vrfPrf, setVrfPrf] = useState(null);
  const [prfs, setPrfs] = useState(MOCK_PRFS);
  const [vendors, setVendors] = useState(MOCK_VENDORS);

  const pageTitle = { dashboard: "Dashboard", prfs: "PRFs", vendors: "Vendors", orders: "Purchase Orders", documents: "Documents" };

  const handleVendorUpdate = (updatedVendor) => {
    setVendors((prev) => prev.map((v) => (v.name === updatedVendor.name ? updatedVendor : v)));
    setSelectedVendor(updatedVendor);
  };

  const renderContent = () => {
    if (vrfPrf) return <VRFPage prf={vrfPrf} onBack={() => setVrfPrf(null)} />;
    if (selectedVendor) return <VendorDetail vendor={selectedVendor} onBack={() => setSelectedVendor(null)} onUpdateVendor={handleVendorUpdate} />;
    if (selectedPrf) return <PRFDetail prf={selectedPrf} onBack={() => setSelectedPrf(null)} onUpdatePrf={(updated) => { setPrfs((prev) => prev.map((p) => (p.id === updated.id ? updated : p))); setSelectedPrf(updated); }} />;
    switch (page) {
      case "dashboard": return <Dashboard prfs={prfs} onSelectPrf={setSelectedPrf} />;
      case "prfs": return <PRFsPage prfs={prfs} onSelectPrf={setSelectedPrf} />;
      case "vendors": return <VendorsPage onSelectVendor={setSelectedVendor} />;
      case "orders": return <PurchaseOrdersPage prfs={prfs} />;
      case "documents": return <DocumentsPage prfs={prfs} />;
      default: return null;
    }
  };

  // Detect VRF entry
  useEffect(() => {
    const newVendorPrf = prfs.find((p) => p.vendorStatus === "new_pending" && p.status === "vendor_validation");
    // Don't auto-navigate; user can click into it
  }, [prfs]);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: T.bg, minHeight: "100vh", display: "flex" }}>
      <Sidebar active={selectedPrf || vrfPrf || selectedVendor ? (vrfPrf ? "vendors" : selectedVendor ? "vendors" : "prfs") : page} onNav={(key) => { setPage(key); setSelectedPrf(null); setVrfPrf(null); setSelectedVendor(null); }} />
      <div style={{ flex: 1, marginLeft: T.sidebarW }}>
        <TopBar title={vrfPrf ? "VRF / VIF Submission" : selectedVendor ? `Vendor Detail – ${selectedVendor.name}` : selectedPrf ? `PRF Detail – ${selectedPrf.id}` : pageTitle[page]} />
        <main style={{ padding: "24px 28px", paddingTop: T.headerH + 24 }}>
          {renderContent()}
          {/* Quick action: open VRF for new vendor PRF */}
          {!selectedPrf && !vrfPrf && !selectedVendor && page === "dashboard" && (
            <div style={{ marginTop: 20 }}>
              <Card style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fffbeb", border: "1px solid #f6e05e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fef08a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="alert" size={18} color="#d97706" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#92400e" }}>VRF / VIF Required for DevTools Inc</div>
                    <div style={{ fontSize: 12, color: "#78716c" }}>PRF-2526-002 · Vendor not found in SAGE – please submit vendor details</div>
                  </div>
                </div>
                <button onClick={() => setVrfPrf(prfs.find((p) => p.id === "PRF-2526-002"))} style={{ background: "#d97706", color: "#fff", border: "none", borderRadius: 7, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                  Submit VRF →
                </button>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
