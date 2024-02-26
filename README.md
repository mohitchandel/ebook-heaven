# Welcome to Ebook Heaven 📚✨

Ebook Heaven is a delightful application tailored for book enthusiasts. It serves as a platform for authors to showcase and publish their literary creations while providing readers with seamless access to a treasure trove of ebooks by their favorite authors.

## Features

### For Authors

**Note:** Users have to verify their email before login.

Authors can create their profiles under the "Author" category:

- **Profile Creation:** Build your author profile to showcase your literary journey.
- **Book Listing:** Easily list and publish your ebooks for readers to discover.
- **Ebook Downloads:** Access a wide array of ebooks uploaded by fellow authors.

### For Readers

Readers can create their accounts under the "Reader" profile:

- **Account Setup:** Create a reader account to personalize your Ebook Heaven experience.
- **Ebook Downloads:** Dive into a world of literature and download ebooks of your choice with ease.

**Note:** Only registered authors can publish their ebooks on Ebook Heaven.

## Dependencies

Ebook Heaven utilizes a stack of powerful technologies:

- **CSS Framework:** [`Tailwind CSS`](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- **UI:** [`@nextui-org/react`](https://github.com/nextui-org/react) - A sleek UI library for Next.js applications.
- **Framework:** [`Next.js`](https://nextjs.org/) - The JavaScript library for building intuitive user interfaces.
- **Notifications:** [`react-hot-toast`](https://react-hot-toast.com/) - Engaging toast notifications tailored for React applications.
- **Database:** [`supabase`](https://supabase.io/docs/guides/database) - A robust database solution to power the backend.
- **Schema Management:** [`prisma`](https://www.prisma.io/) - Streamline database schema management for increased efficiency.
- **API:** [`trpc`](https://trpc.io/) - A versatile tool for building type-safe APIs effortlessly.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mohitchandel/ebook-heaven.git
   ```
2. Install dependencies using `npm install` or `yarn install`.
3. Run the application using `npm start` or `yarn start`.

## Set Up Environment Variables:

Create a .env file in the root directory of your project and add the following variables:

```env
DATABASE_URL="" #supabase database url
SUPABASE_PASSWORD=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
```
