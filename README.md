# Crypto Tips - Web3 Tipping Platform

A decentralized tipping platform built on Web3 technology, allowing content creators to receive cryptocurrency tips from their supporters.1

## Features

- **Web3 Integration**: Connect with MetaMask wallet for secure transactions
- **Easy Tipping**: Send ETH/USDT tips with just a few clicks
- **Creator Pages**: Personalized tipping pages for each creator
- **Tip History**: Track all tips sent and received
- **Social Sharing**: Share your tipping page via QR code or link

## Tech Stack

### Frontend

- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- ethers.js (Web3 integration)

### Backend

- Node.js + Express + TypeScript
- Prisma (ORM)
- SQLite (Database)
- JWT (Authentication)

### Blockchain

- Ethereum (Sepolia testnet)
- MetaMask wallet integration

## Project Structure

```
crypto-tips/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
├── docs/              # Documentation and analysis
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/crypto-tips.git
cd crypto-tips
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
cd backend
npm install
```

4. Set up environment variables:

```bash
# Backend (.env)
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
PORT=3000
```

5. Initialize database:

```bash
cd backend
npx prisma migrate dev
```

6. Run the application:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Usage

1. **For Creators**:

   - Connect your MetaMask wallet
   - Create your profile page
   - Share your unique tipping link

2. **For Supporters**:
   - Visit a creator's tipping page
   - Connect your wallet
   - Send a tip with an optional message

## Development Roadmap

- [x] Project initialization
- [ ] User authentication system
- [ ] Creator profile management
- [ ] MetaMask wallet integration
- [ ] Tipping functionality
- [ ] Transaction history
- [ ] QR code generation
- [ ] Social sharing features
- [ ] Dashboard analytics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/yourusername/crypto-tips](https://github.com/yourusername/crypto-tips)

## Acknowledgments

- Built as a course project exploring Web3 technologies
- Inspired by platforms like Ko-fi and Buy Me a Coffee
- Special thanks to the Ethereum and Web3 community
