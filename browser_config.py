import http.server
import socketserver
import webbrowser
import threading

PORT = 8000
DIRECTORY = r"C:\Users\Justin\Desktop\display" #Change this to your directory

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving HTTP on port {PORT}")
        httpd.serve_forever()

def open_browser():
    url = f"http://localhost:{PORT}"
    webbrowser.open(url)

if __name__ == "__main__":
    # Start the server in a new thread
    server_thread = threading.Thread(target=start_server)
    server_thread.daemon = True
    server_thread.start()

    # Give the server a second to start
    import time
    time.sleep(1)

    # Open the browser
    open_browser()

    # Keep the main thread alive to keep the server running
    server_thread.join()
