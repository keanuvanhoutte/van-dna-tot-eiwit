"""Lokale ontwikkelserver zonder browsercache (zodat wijzigingen meteen zichtbaar zijn)."""
import http.server, os, sys

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 256      # de app laadt ~100 modules tegelijk; standaard (5) laat verbindingen wegvallen
    daemon_threads = True

if __name__ == '__main__':
    os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
    Server(('127.0.0.1', port), NoCache).serve_forever()
