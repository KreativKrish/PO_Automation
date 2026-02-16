# Vendor Workflow Implementation Summary

## Overview
Implemented a comprehensive vendor approval workflow in the Vendors Tab that handles the complete lifecycle from vendor information request through SAGE creation.

## Workflow Stages

### 1. **Pending - Requester** Status
- **Trigger**: When a vendor is not found in SAGE during PRF processing
- **Action**: System automatically sends VIF (Vendor Information Form) email to the requester
- **Display**: Vendor appears in the Vendors tab with "Pending - Requester" status
- **Example**: SkillUp Academy (waiting for Neha Kapoor to fill VIF)

### 2. **Approval Pending** Status
- **Trigger**: After requester submits the VIF form with all required documents
- **Action**: Vivek can now review the vendor details
- **Capabilities**:
  - View all vendor information (contact, bank, tax details)
  - View uploaded documents (PAN Card, Bank Statement, etc.)
  - Edit vendor details if needed
  - Approve or Reject the vendor
  - View audit trail of all actions
- **Example**: DevTools Inc (submitted by Rohan Mehta, awaiting Vivek's approval)

### 3. **Pending - SAGE** Status
- **Trigger**: When Vivek approves the vendor
- **Action**: Vendor details are submitted to SAGE for creation
- **Display**: Vendor shows "Pending - SAGE" status
- **Note**: Vivek can add optional comments during approval

### 4. **Created** Status
- **Trigger**: When SAGE successfully creates the vendor
- **Action**: Vendor is now active in the system with a vendor code
- **Result**: Can be used for PRF processing

### 5. **Rejection Flow**
- **Trigger**: When Vivek rejects the vendor
- **Requirement**: **Mandatory comment** explaining the reason for rejection
- **Action**: 
  - Status reverts to "Pending - Requester"
  - Requester is notified via email
  - Requester must resubmit the VIF form
- **Audit**: Rejection reason is logged in the audit trail

## Key Features Implemented

### Vendor List View
- **Status Filters**: All, Active, Approval Pending, Pending - Requester, Pending - SAGE, Created
- **Type Filters**: All Types, Teamlease Edtech, Teamlease Foundation, AIF
- **Columns**: Vendor Name, Code, Type, GST, Bank, Status, Action
- **Clickable Rows**: Vendors with "Approval Pending" or "Pending - Requester" status show a "View" button

### Vendor Detail View (for Approval Pending vendors)
**Left Panel - Vendor Information:**
- Vendor Name, New Vendor Name, PAN, GSTIN
- Contact Name, Email, Phone
- Type (Teamlease Edtech/Foundation/AIF)

**Left Panel - Bank Details:**
- Bank Name, Account Number, IFSC Code
- MSME Registration Number
- Type of Enterprise (Micro/Small/Medium)
- Major Activity

**Right Panel - Action Panel:**
- **Approve Button**: Submits vendor to SAGE (optional comment)
- **Reject Button**: Sends back to requester (mandatory comment)
- **Edit Button**: Allows editing all vendor fields
- **Save Edit Button**: Saves changes and remains in Approval Pending status

**Right Panel - Documents:**
- Lists all uploaded documents (PAN Card, Bank Statement, Company Registration, etc.)
- View and Download buttons for each document

**Right Panel - Audit Trail:**
- Complete history of all actions
- Shows who did what and when
- System actions vs. user actions clearly differentiated

### Modal Confirmations
**Approve Modal:**
- Confirms submission to SAGE
- Optional comment field
- Success message on approval

**Reject Modal:**
- Warns that requester will be notified
- **Mandatory comment field** (cannot proceed without it)
- Validation warning if comment is empty
- Success message on rejection

**Edit Save Modal:**
- Confirms saving of edited details
- Updates audit trail

## Data Structure Updates

### Vendor Status Map
```javascript
const VENDOR_STATUS_MAP = {
  existing: { label: "Existing", color: "#16a34a", bg: "#dcfce7" },
  pending_requester: { label: "Pending - Requester", color: "#f59e0b", bg: "#fef3c7" },
  approval_pending: { label: "Approval Pending", color: "#fb923c", bg: "#ffedd5" },
  pending_sage: { label: "Pending - SAGE", color: "#3b82f6", bg: "#dbeafe" },
  created: { label: "Created", color: "#14b8a6", bg: "#ccfbf1" },
};
```

### Mock Vendor Data
Added two example vendors:
1. **DevTools Inc** (approval_pending): Has all details filled, documents uploaded, ready for Vivek's review
2. **SkillUp Academy** (pending_requester): VIF email sent, waiting for requester to submit form

## User Experience Flow

### For Requester:
1. Submit PRF with new vendor
2. Receive VIF email notification
3. Fill VIF form with vendor details and upload documents
4. Submit form
5. Wait for Vivek's approval
6. If rejected: Receive notification with reason, resubmit corrected information

### For Vivek (Approver):
1. Navigate to Vendors tab
2. Filter by "Approval Pending" to see vendors awaiting review
3. Click "View" on a vendor
4. Review all vendor information and documents
5. Edit details if needed
6. Either:
   - **Approve**: Add optional comment, confirm → Vendor goes to SAGE
   - **Reject**: Add mandatory comment explaining reason, confirm → Vendor goes back to requester

### For SAGE Team:
1. Receive vendor details from system
2. Create vendor in SAGE
3. Update status to "Created"
4. Vendor code is generated and assigned

## Technical Implementation

### Components Created:
1. **VendorsPage**: List view with filters and status badges
2. **VendorDetail**: Detailed view with edit, approve, reject capabilities
3. **Modal Dialogs**: Confirmation modals for approve/reject/edit actions

### State Management:
- `selectedVendor`: Currently viewed vendor
- `vendors`: Array of all vendors (managed in App component)
- `handleVendorUpdate`: Updates vendor in state and refreshes view

### Props Flow:
- `VendorsPage` receives `onSelectVendor` callback
- `VendorDetail` receives `vendor`, `onBack`, `onUpdateVendor`
- App component manages all state and passes handlers down

## Email Notifications (To Be Implemented)
1. **VIF Request Email**: Sent to requester when vendor not found
2. **Approval Notification**: Sent to requester when Vivek approves
3. **Rejection Notification**: Sent to requester with rejection reason
4. **SAGE Notification**: Sent to SAGE team with vendor details for creation

## Future Enhancements
1. Document preview functionality
2. Document upload interface
3. Email template management
4. SAGE API integration
5. Bulk vendor approval
6. Vendor history tracking
7. Duplicate vendor detection
8. Auto-fill from government databases (GST, PAN verification)
