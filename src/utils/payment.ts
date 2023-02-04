import shortId from 'short-uuid';
export function generateTransactionReference() {
    const d = new Date();
    return `txn_${d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear().toString().slice(-2)}_${shortId.generate()}`
}

export function formatPhoneNumber(phoneNumber: string) {
    phoneNumber = phoneNumber.replace(/\D/g, '');
    if (!phoneNumber.startsWith('237')) return phoneNumber;
    return `237${phoneNumber}`
}

export function getCurrencyFromCountryCode(iso: string) {
    switch (iso.toUpperCase()){
        case 'CM':  // 'CM' (Cameroon)
        default:
            return 'XAF';
        case 'SN':  // 'SN' (Senegal).
        case 'BF':  // 'BF' (Burkina Faso).
        case 'CI': // 'CI' (Côte d'Ivoire)
            return 'XOF';
    }
}
