
export interface Account {
    id: string;
    name: string;
    balance: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    accountNumber?: string; // Optional field for account number
}

export interface AccountBalance {
    amount: number;
    currency: string;
}

export interface AccountStatement {
    accountId: string;
    transactions: Transaction[]; 
}

export interface Transaction {
    id: string;
    type: 'deposit' | 'withdrawal';
    amount: number;
    date: Date;
    description?: string; // Optional field for transaction description
}

export class DepositTransaction implements Transaction {
    id: string;
    type: 'deposit' = 'deposit';
    amount: number;
    date: Date;
    description?: string;

    constructor(id: string, amount: number, date: Date, description?: string) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }
}

export class WithdrawalTransaction implements Transaction {
    id: string;
    type: 'withdrawal' = 'withdrawal';
    amount: number;
    date: Date;
    description?: string;

    constructor(id: string, amount: number, date: Date, description?: string) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }
}