use anyhow::Result;
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tracing::info;

pub struct SynchroServer {
    addr: SocketAddr,
}

impl SynchroServer {
    pub fn new(addr: SocketAddr) -> Self {
        Self { addr }
    }

    pub async fn run(&self) -> Result<()> {
        let listener = TcpListener::bind(self.addr).await?;
        info!("Synchro server listening on {}", self.addr);

        loop {
            let (stream, peer_addr) = listener.accept().await?;
            info!("New connection from {}", peer_addr);
            tokio::spawn(async move {
                if let Err(e) = Self::handle_connection(stream, peer_addr).await {
                    tracing::error!("Connection error from {}: {}", peer_addr, e);
                }
            });
        }
    }

    async fn handle_connection(
        stream: tokio::net::TcpStream,
        peer_addr: SocketAddr,
    ) -> Result<()> {
        use tokio_tungstenite::accept_async;
        let _ws_stream = accept_async(stream).await?;
        info!("WebSocket handshake complete for {}", peer_addr);
        // TODO: Sprint 1 — implement packet dispatch loop
        Ok(())
    }
}
