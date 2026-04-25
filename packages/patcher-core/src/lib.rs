use anyhow::Result;
use sha2::{Digest, Sha256};
use std::path::Path;

pub fn sha256_file(path: &Path) -> Result<String> {
    let bytes = std::fs::read(path)?;
    let hash = Sha256::digest(&bytes);
    Ok(format!("{:x}", hash))
}

pub fn verify_hash(path: &Path, expected: &str) -> Result<bool> {
    Ok(sha256_file(path)? == expected)
}

// TODO: Sprint 5 — implement .bps and .ips patch application
pub fn apply_bps_patch(_rom: &Path, _patch: &Path, _output: &Path) -> Result<()> {
    anyhow::bail!("BPS patch application not yet implemented")
}

pub fn apply_ips_patch(_rom: &Path, _patch: &Path, _output: &Path) -> Result<()> {
    anyhow::bail!("IPS patch application not yet implemented")
}
