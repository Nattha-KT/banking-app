## **Entities Documentation for ERD**

### 1. **User Entity**

| Attribute           | Type   | Description                            |
| ------------------- | ------ | -------------------------------------- |
| `$id`               | String | Primary key, unique identifier         |
| `userId`            | String | Unique user identifier                 |
| `email`             | String | User's email address (unique)          |
| `dwollaCustomerUrl` | String | URL for Dwolla customer                |
| `dwollaCustomerId`  | String | ID for Dwolla customer                 |
| `firstName`         | String | User's first name                      |
| `lastName`          | String | User's last name                       |
| `name`              | String | Full name (for legacy purposes)        |
| `address1`          | String | User's address line 1                  |
| `city`              | String | City of the user's address             |
| `state`             | String | State of the user's address            |
| `postalCode`        | String | Postal/Zip code                        |
| `dateOfBirth`       | String | User's date of birth (YYYY-MM-DD)      |
| `ssn`               | String | Social Security Number (last 4 digits) |

---

### 2. **Account Entity**

| Attribute          | Type   | Description                                    |
| ------------------ | ------ | ---------------------------------------------- |
| `id`               | String | Primary key, unique account identifier         |
| `availableBalance` | Number | Available balance in the account               |
| `currentBalance`   | Number | Current balance including pending transactions |
| `officialName`     | String | Official name of the account                   |
| `mask`             | String | Last 4 digits of the account number            |
| `institutionId`    | String | ID of the associated financial institution     |
| `name`             | String | Nickname for the account                       |
| `type`             | String | Type of account (e.g., depository, credit)     |
| `subtype`          | String | Subtype of account (e.g., checking, savings)   |
| `appwriteItemId`   | String | Reference ID from Appwrite database            |
| `shareableId`      | String | Unique ID for sharing account details          |

---

### 3. **Transaction Entity**

| Attribute        | Type    | Description                                 |
| ---------------- | ------- | ------------------------------------------- |
| `id`             | String  | Primary key, unique transaction identifier  |
| `$id`            | String  | Appwrite document ID                        |
| `name`           | String  | Name/description of the transaction         |
| `paymentChannel` | String  | Channel of payment (e.g., online, in store) |
| `type`           | String  | Type of transaction (e.g., debit, credit)   |
| `accountId`      | String  | Foreign key referencing Account             |
| `amount`         | Number  | Transaction amount                          |
| `pending`        | Boolean | Whether the transaction is pending          |
| `category`       | String  | Category of expense (e.g., Food, Travel)    |
| `date`           | String  | Transaction date (YYYY-MM-DD)               |
| `image`          | String  | URL to an associated image                  |
| `$createdAt`     | String  | Timestamp of transaction creation           |
| `channel`        | String  | Specific channel (e.g., mobile, web)        |
| `senderBankId`   | String  | Bank ID for the sender (if applicable)      |
| `receiverBankId` | String  | Bank ID for the receiver (if applicable)    |

---

### 4. **Bank Entity**

| Attribute          | Type   | Description                         |
| ------------------ | ------ | ----------------------------------- |
| `$id`              | String | Primary key, unique bank identifier |
| `accountId`        | String | Foreign key referencing Account     |
| `bankId`           | String | Unique identifier for the bank      |
| `accessToken`      | String | Token for accessing bank's API      |
| `fundingSourceUrl` | String | URL for funding source in Dwolla    |
| `userId`           | String | Foreign key referencing User        |
| `shareableId`      | String | Unique ID for sharing bank details  |

---

### **Relationships**

1. **User to Bank**: One-to-Many (One User can have multiple Banks)
2. **User to Account**: One-to-Many (One User can have multiple Accounts)
3. **Account to Transaction**: One-to-Many (One Account can have multiple Transactions)
4. **Bank to Account**: One-to-One (Each Bank has a single associated Account)

---

## **Example Diagram Layout**

- **User** → (has many) → **Bank**
- **User** → (has many) → **Account**
- **Account** → (has many) → **Transaction**
- **Bank** → (belongs to) → **Account**

---
