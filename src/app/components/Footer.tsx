export default function Footer() {
    return (
      <footer className="fixed bottom-0 left-0 w-full py-4">
        <div className="container mx-auto text-center">
          <a
            href="https://github.com/yihfei/bloom"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>&copy; {new Date().getFullYear()} Bloom. All rights reserved.</p>
          </a>
        </div>
      </footer>
    );
  }