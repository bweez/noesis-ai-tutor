#!/bin/bash

# Jekyll Server Manager
# Manages a persistent Jekyll server for faster test runs

set -e

JEKYLL_DIR="../noesis-docs"
JEKYLL_PORT=4000
PIDFILE="/tmp/jekyll_server.pid"

start_server() {
    echo "🚀 Starting Jekyll server..."
    
    if server_running; then
        echo "✅ Jekyll server already running on port $JEKYLL_PORT"
        return 0
    fi
    
    cd "$JEKYLL_DIR"
    
    # Start server in background and save PID
    bundle exec jekyll serve --port $JEKYLL_PORT --detach --incremental > /dev/null 2>&1
    
    # Wait for server to be ready
    echo "⏳ Waiting for server to be ready..."
    local attempts=0
    while ! curl -f http://localhost:$JEKYLL_PORT > /dev/null 2>&1; do
        sleep 1
        attempts=$((attempts + 1))
        if [ $attempts -gt 30 ]; then
            echo "❌ Server failed to start after 30 seconds"
            return 1
        fi
    done
    
    echo "✅ Jekyll server ready at http://localhost:$JEKYLL_PORT"
}

stop_server() {
    echo "🛑 Stopping Jekyll server..."
    
    # Kill any Jekyll processes
    pkill -f "jekyll serve" 2>/dev/null || true
    
    # Also check for processes on the port
    local pid=$(lsof -ti:$JEKYLL_PORT 2>/dev/null || true)
    if [ -n "$pid" ]; then
        kill $pid 2>/dev/null || true
        sleep 2
        kill -9 $pid 2>/dev/null || true
    fi
    
    # Clean up PID file
    rm -f "$PIDFILE"
    
    echo "✅ Jekyll server stopped"
}

server_running() {
    curl -f http://localhost:$JEKYLL_PORT > /dev/null 2>&1
}

status() {
    if server_running; then
        echo "✅ Jekyll server is running on port $JEKYLL_PORT"
        
        # Show process info
        local pid=$(lsof -ti:$JEKYLL_PORT 2>/dev/null || true)
        if [ -n "$pid" ]; then
            echo "📊 PID: $pid"
            ps -p $pid -o pid,ppid,pcpu,pmem,time,command 2>/dev/null || true
        fi
        return 0
    else
        echo "❌ Jekyll server is not running"
        return 1
    fi
}

restart_server() {
    echo "🔄 Restarting Jekyll server..."
    stop_server
    sleep 2
    start_server
}

case "${1:-start}" in
    "start")
        start_server
        ;;
    "stop")
        stop_server
        ;;
    "restart")
        restart_server
        ;;
    "status")
        status
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        echo ""
        echo "Commands:"
        echo "  start   - Start Jekyll server in background"
        echo "  stop    - Stop Jekyll server"
        echo "  restart - Restart Jekyll server"
        echo "  status  - Check if server is running"
        exit 1
        ;;
esac
