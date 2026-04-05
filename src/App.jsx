import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase Client ───────────────────────────────────────────────────────────
const supabaseUrl = "https://nkvmcbavdsifkbneyloo.supabase.co";
const supabaseKey = "sb_publishable_GoxiomWIQUaOTcRs_QbM4g_Z5-p8Me_";
const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const ACCENT = "#5B4FE8";
const ACCENT_LIGHT = "#EEF0FF";
const ACCENT_MID = "#7C74F0";

// ─── Global Styles ─────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    font-family: 'Inter', sans-serif;
    background: #F7F8FC;
    min-height: 100vh;
    color: #1A1A2E;
    width: 100%;
  }

  .auth-page {
    min-height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(145deg, #F0F1FF 0%, #F7F8FC 50%, #EEF0FF 100%);
    padding: 24px 16px; position: relative; overflow: hidden;
  }
  .auth-page::before { content: ''; position: absolute; top: -120px; right: -120px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(91,79,232,0.12) 0%, transparent 70%); pointer-events: none; }
  .auth-page::after { content: ''; position: absolute; bottom: -100px; left: -100px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(124,116,240,0.10) 0%, transparent 70%); pointer-events: none; }
  .auth-card { background: #fff; border-radius: 24px; padding: 40px 36px; width: 100%; max-width: 420px; border: 1px solid #EDEEF5; box-shadow: 0 8px 48px rgba(91,79,232,0.10), 0 1px 4px rgba(0,0,0,0.05); position: relative; z-index: 1; animation: authFadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
  @keyframes authFadeIn { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .auth-logo-wrap { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 6px; }
  .auth-logo-icon { width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(135deg, ${ACCENT}, ${ACCENT_MID}); display: flex; align-items: center; justify-content: center; font-size: 22px; box-shadow: 0 4px 16px rgba(91,79,232,0.28); }
  .auth-logo-text { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 22px; color: ${ACCENT}; letter-spacing: -0.5px; }
  .auth-tagline { font-size: 12px; color: #8B8FA8; text-align: center; margin-bottom: 32px; }
  .auth-tabs { display: flex; background: #F7F8FC; border-radius: 12px; padding: 4px; margin-bottom: 28px; gap: 4px; }
  .auth-tab { flex: 1; padding: 10px; border-radius: 9px; border: none; font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; background: transparent; color: #8B8FA8; }
  .auth-tab.active { background: #fff; color: ${ACCENT}; box-shadow: 0 2px 8px rgba(91,79,232,0.12), 0 1px 2px rgba(0,0,0,0.06); }
  .auth-field { margin-bottom: 14px; }
  .auth-label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; color: #6B6F8A; margin-bottom: 6px; }
  .auth-input-wrap { position: relative; }
  .auth-input-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); font-size: 15px; pointer-events: none; opacity: 0.55; }
  .auth-input { width: 100%; border: 1.5px solid #EDEEF5; border-radius: 12px; padding: 12px 14px 12px 38px; font-family: 'Inter', sans-serif; font-size: 14px; color: #1A1A2E; background: #fff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
  .auth-input:focus { border-color: ${ACCENT}; box-shadow: 0 0 0 3px rgba(91,79,232,0.10); }
  .auth-input::placeholder { color: #C0C4DA; }
  .auth-input.error { border-color: #EF4444; }
  .auth-eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 16px; color: #8B8FA8; padding: 4px; line-height: 1; }
  .auth-submit-btn { width: 100%; background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); color: #fff; border: none; border-radius: 13px; padding: 14px; font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; margin-top: 6px; display: flex; align-items: center; justify-content: center; gap: 8px; transition: opacity 0.2s, transform 0.1s; box-shadow: 0 4px 20px rgba(91,79,232,0.28); }
  .auth-submit-btn:hover { opacity: 0.92; }
  .auth-submit-btn:active { transform: scale(0.98); }
  .auth-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .auth-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
  .auth-divider-line { flex: 1; height: 1px; background: #EDEEF5; }
  .auth-divider-text { font-size: 11px; color: #B0B4CA; letter-spacing: 0.5px; text-transform: uppercase; }
  .auth-google-btn { width: 100%; background: #fff; color: #1A1A2E; border: 1.5px solid #EDEEF5; border-radius: 13px; padding: 13px; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: border-color 0.15s, background 0.15s; }
  .auth-google-btn:hover { border-color: #D1D5F0; background: #FAFBFF; }
  .auth-error { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 10px; padding: 10px 13px; color: #991B1B; font-size: 12px; line-height: 1.5; margin-bottom: 14px; display: flex; align-items: flex-start; gap: 7px; }
  .auth-success { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 10px 13px; color: #166534; font-size: 12px; line-height: 1.5; margin-bottom: 14px; display: flex; align-items: flex-start; gap: 7px; }
  .auth-forgot { display: block; text-align: right; font-size: 12px; color: ${ACCENT}; cursor: pointer; margin-top: -6px; margin-bottom: 14px; font-weight: 500; }
  .auth-terms { font-size: 11px; color: #8B8FA8; text-align: center; margin-top: 16px; line-height: 1.6; }
  .auth-terms a { color: ${ACCENT}; text-decoration: none; }
  .auth-spinner { width: 17px; height: 17px; border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }

  /* ── Main App ── */
  .app { width: 100%; margin: 0 auto; background: #F7F8FC; min-height: 100vh; display: flex; flex-direction: column; position: relative; align-items: center; animation: authFadeIn 0.35s ease both; }
  .topbar { background: #fff; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #EDEEF5; position: sticky; top: 0; z-index: 10; width: 100%; }
  .topbar-logo { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 17px; color: ${ACCENT}; letter-spacing: -0.3px; }
  .topbar-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, ${ACCENT}, ${ACCENT_MID}); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 600; font-family: 'Sora', sans-serif; cursor: pointer; position: relative; }
  .user-menu { position: absolute; top: 44px; right: 0; background: #fff; border: 1px solid #EDEEF5; border-radius: 14px; padding: 8px; min-width: 180px; box-shadow: 0 8px 32px rgba(0,0,0,0.10); z-index: 100; animation: dropIn 0.18s ease both; }
  @keyframes dropIn { from { opacity: 0; transform: translateY(-8px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .user-menu-email { font-size: 11px; color: #8B8FA8; padding: 6px 10px 10px; border-bottom: 1px solid #F3F4FA; margin-bottom: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .user-menu-item { display: flex; align-items: center; gap: 8px; padding: 9px 10px; border-radius: 9px; font-size: 13px; font-weight: 500; color: #1A1A2E; cursor: pointer; transition: background 0.12s; border: none; background: none; width: 100%; text-align: left; font-family: 'Inter', sans-serif; }
  .user-menu-item:hover { background: #F7F8FC; }
  .user-menu-item.danger { color: #EF4444; }
  .user-menu-item.danger:hover { background: #FEF2F2; }

  .content { width: 60%; flex: 1; padding: 24px 16px 100px; overflow-y: auto; }
  .hero-label { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; color: ${ACCENT}; text-transform: uppercase; text-align: center; margin-bottom: 8px; }
  .hero-title { font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 700; color: #1A1A2E; text-align: center; line-height: 1.25; margin-bottom: 28px; letter-spacing: -0.5px; }

  .upload-zone { background: #fff; border: 2px dashed #D1D5F0; border-radius: 16px; padding: 32px 20px; text-align: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; margin-bottom: 14px; }
  .upload-zone:hover, .upload-zone.drag { border-color: ${ACCENT}; background: ${ACCENT_LIGHT}; }
  .upload-icon { width: 44px; height: 44px; background: ${ACCENT_LIGHT}; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; }
  .upload-title { font-size: 14px; font-weight: 600; color: #1A1A2E; margin-bottom: 4px; }
  .upload-sub { font-size: 12px; color: #8B8FA8; }

  .divider-label { font-size: 11px; color: #8B8FA8; text-align: center; letter-spacing: 1px; text-transform: uppercase; margin: 14px 0; position: relative; }
  .divider-label::before, .divider-label::after { content: ''; position: absolute; top: 50%; width: 38%; height: 1px; background: #EDEEF5; }
  .divider-label::before { left: 0; }
  .divider-label::after { right: 0; }

  .textarea { width: 100%; border: 1.5px solid #EDEEF5; border-radius: 14px; padding: 14px; font-family: 'Inter', sans-serif; font-size: 14px; color: #1A1A2E; background: #fff; resize: vertical; min-height: 120px; outline: none; transition: border-color 0.2s; line-height: 1.6; }
  .textarea:focus { border-color: ${ACCENT}; }
  .textarea::placeholder { color: #B0B4CA; }

  .analyze-btn { width: 100%; background: ${ACCENT}; color: #fff; border: none; border-radius: 14px; padding: 16px; font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s, transform 0.1s; }
  .analyze-btn:hover { background: #4940D4; }
  .analyze-btn:active { transform: scale(0.98); }
  .analyze-btn:disabled { background: #B0B4CA; cursor: not-allowed; }

  .section-label { font-size: 10px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: #8B8FA8; text-align: center; margin: 28px 0 16px; }
  .card { background: #fff; border-radius: 16px; padding: 18px; margin-bottom: 14px; border: 1px solid #EDEEF5; }
  .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .card-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .card-title { font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 600; color: #1A1A2E; }
  .extracted-text { font-size: 13px; line-height: 1.7; color: #4A4E6B; max-height: 140px; overflow-y: auto; }
  .flag-item { border-radius: 10px; padding: 12px 14px; margin-bottom: 10px; }
  .flag-item:last-child { margin-bottom: 0; }
  .flag-type { font-size: 11px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 4px; }
  .flag-text { font-size: 12px; line-height: 1.55; }
  .flag-score { font-size: 10px; font-weight: 600; margin-top: 6px; opacity: 0.7; }
  .explanation-text { font-size: 13px; line-height: 1.75; color: #3A3E5B; }
  .bullet-points { margin: 12px 0 0; padding: 0; list-style: none; }
  .bullet-points li { font-size: 12px; color: #4A4E6B; padding: 5px 0 5px 18px; position: relative; line-height: 1.5; border-bottom: 1px solid #F3F4FA; }
  .bullet-points li:last-child { border-bottom: none; }
  .bullet-points li::before { content: ''; position: absolute; left: 0; top: 12px; width: 7px; height: 7px; border-radius: 50%; background: ${ACCENT}; }
  .quiz-q { background: #F7F8FC; border-radius: 12px; padding: 14px; margin-bottom: 10px; }
  .quiz-q-text { font-size: 13px; font-weight: 600; color: #1A1A2E; margin-bottom: 10px; line-height: 1.5; }
  .quiz-option { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 9px; margin-bottom: 6px; font-size: 12px; cursor: pointer; background: #fff; border: 1.5px solid #EDEEF5; transition: border-color 0.15s, background 0.15s; text-align: left; width: 100%; color: #1A1A2E; font-family: 'Inter', sans-serif; }
  .quiz-option:hover { border-color: ${ACCENT}; }
  .quiz-option.correct { border-color: #22C55E; background: #F0FDF4; color: #166534; }
  .quiz-option.wrong { border-color: #EF4444; background: #FEF2F2; color: #991B1B; }
  .quiz-option.show-answer { border-color: #22C55E; background: #F0FDF4; }
  .quiz-letter { width: 22px; height: 22px; border-radius: 50%; background: #EDEEF5; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; color: #5B5F7B; }
  .correct .quiz-letter { background: #22C55E; color: #fff; }
  .wrong .quiz-letter { background: #EF4444; color: #fff; }
  .show-answer .quiz-letter { background: #22C55E; color: #fff; }
  .show-questions-btn { background: none; border: 1.5px solid ${ACCENT}; color: ${ACCENT}; border-radius: 10px; padding: 10px 18px; font-size: 12px; font-weight: 600; font-family: 'Sora', sans-serif; cursor: pointer; width: 100%; margin-top: 8px; transition: background 0.15s; }
  .show-questions-btn:hover { background: ${ACCENT_LIGHT}; }
  .memory-tip { background: linear-gradient(135deg, #EEF0FF, #F5F0FF); border-radius: 12px; padding: 12px 14px; margin-top: 12px; font-size: 12px; color: #5B4FE8; line-height: 1.55; border-left: 3px solid ${ACCENT}; }
  .memory-label { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 4px; }
  .loading-card { background: #fff; border-radius: 16px; padding: 28px; margin-bottom: 14px; border: 1px solid #EDEEF5; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .spinner { width: 36px; height: 36px; border: 3px solid ${ACCENT_LIGHT}; border-top-color: ${ACCENT}; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-label { font-size: 13px; color: #8B8FA8; font-weight: 500; }
  .bottomnav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 100%; background: #fff; border-top: 1px solid #EDEEF5; display: flex; padding: 10px 0 14px; z-index: 10; }
  .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 10px; font-weight: 600; color: #B0B4CA; letter-spacing: 0.5px; cursor: pointer; text-transform: uppercase; transition: color 0.15s; }
  .nav-item.active { color: ${ACCENT}; }
  .nav-icon { font-size: 18px; }
  .chunk-nav { display: flex; gap: 8px; margin-bottom: 14px; overflow-x: auto; padding-bottom: 2px; }
  .chunk-tab { flex-shrink: 0; padding: 7px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; font-family: 'Sora', sans-serif; cursor: pointer; border: 1.5px solid #EDEEF5; background: #fff; color: #8B8FA8; transition: all 0.15s; }
  .chunk-tab.active { background: ${ACCENT}; color: #fff; border-color: ${ACCENT}; }
  .error-card { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 14px; padding: 16px; color: #991B1B; font-size: 13px; line-height: 1.55; margin-bottom: 14px; }
  .file-badge { background: ${ACCENT_LIGHT}; border-radius: 10px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; margin-bottom: 12px; border: 1px solid #D1D5F0; }
  .file-badge-name { font-size: 13px; font-weight: 500; color: ${ACCENT}; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .file-badge-remove { font-size: 16px; color: #8B8FA8; cursor: pointer; padding: 2px; }

  /* ── Files Section ── */
  .files-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; gap: 16px; }
  .files-empty-icon { width: 72px; height: 72px; background: ${ACCENT_LIGHT}; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
  .files-empty-title { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 700; color: #1A1A2E; }
  .files-empty-sub { font-size: 13px; color: #8B8FA8; text-align: center; line-height: 1.6; max-width: 260px; }

  .file-card { background: #fff; border-radius: 16px; padding: 16px 18px; margin-bottom: 12px; border: 1px solid #EDEEF5; transition: border-color 0.2s, box-shadow 0.2s; }
  .file-card:hover { border-color: #C4BFFA; box-shadow: 0 4px 16px rgba(91,79,232,0.08); }
  .file-card-header { display: flex; align-items: flex-start; gap: 12px; }
  .file-card-icon { width: 40px; height: 40px; background: ${ACCENT_LIGHT}; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .file-card-info { flex: 1; min-width: 0; }
  .file-card-title { font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600; color: #1A1A2E; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .file-card-meta { font-size: 11px; color: #8B8FA8; display: flex; gap: 10px; align-items: center; }
  .file-card-preview { font-size: 12px; color: #6B6F8A; line-height: 1.5; margin-top: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .file-card-tags { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
  .file-card-tag { background: ${ACCENT_LIGHT}; color: ${ACCENT}; font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 20px; }
  .file-card-actions { display: flex; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #F3F4FA; }
  .file-action-btn { flex: 1; padding: 8px; border-radius: 9px; font-size: 12px; font-weight: 600; font-family: 'Sora', sans-serif; cursor: pointer; border: 1.5px solid #EDEEF5; background: #fff; color: #4A4E6B; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .file-action-btn:hover { border-color: ${ACCENT}; color: ${ACCENT}; background: ${ACCENT_LIGHT}; }
  .file-action-btn.danger:hover { border-color: #EF4444; color: #EF4444; background: #FEF2F2; }
  .files-loading { display: flex; align-items: center; justify-content: center; padding: 60px 0; }

  /* ── Modal ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; animation: authFadeIn 0.2s ease both; }
  .modal-card { background: #fff; border-radius: 20px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 80px rgba(0,0,0,0.18); }
  .modal-header { padding: 20px 20px 14px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: #fff; z-index: 1; border-bottom: 1px solid #EDEEF5; }
  .modal-title { font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700; color: #1A1A2E; }
  .modal-close { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #EDEEF5; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #8B8FA8; }
  .modal-close:hover { background: #F7F8FC; }
  .modal-body { padding: 20px; }

  /* ── Toast ── */
  .save-toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: #1A1A2E; color: #fff; padding: 10px 20px; border-radius: 20px; font-size: 13px; font-weight: 500; z-index: 300; animation: toastIn 0.3s ease both; white-space: nowrap; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  @media (max-width: 768px) { .content { width: 100%; } .auth-card { padding: 32px 24px; } }
`;

// ─── Helpers ───────────────────────────────────────────────────────────────────
function scoreChunks(text) {
  const paragraphs = text.split(/\n{2,}|\. {2,}/).map(p => p.trim()).filter(p => p.length > 60);
  if (paragraphs.length === 0) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const chunks = [];
    for (let i = 0; i < sentences.length; i += 3) {
      const chunk = sentences.slice(i, i + 3).join(" ").trim();
      if (chunk.length > 40) chunks.push(chunk);
    }
    return scoreList(chunks.length ? chunks : [text]);
  }
  return scoreList(paragraphs);
}

function scoreList(chunks) {
  const jargonWords = /\b(theorem|hypothesis|coefficient|derivative|integral|algorithm|entropy|photosynthesis|mitosis|quantum|neural|polymer|electrode|transistor|amplitude|wavelength|frequency|gradient|vector|matrix|tensor|eigenvalue|axiom|lemma|corollary|stochastic|heuristic|asymptotic|paradigm|hegemony|cytoplasm|mitochondria|ribosome|nucleotide|amino|protein|enzyme|catalyst|reactant|oxidation|reduction|electrolysis|magnetism|refraction|diffraction|convolution|recursion|polymorphism|encapsulation|abstraction|bandwidth|latency|throughput|impedance|capacitance|inductance|resistance|voltage|current|potential|momentum|velocity|acceleration|displacement|trajectory|oscillation|resonance|damping|inertia|torque)\b/gi;
  const abbrPattern = /\b[A-Z]{2,5}\b/g;
  return chunks.map((chunk, idx) => {
    const words = chunk.split(/\s+/);
    const sentences = chunk.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSent = sentences.length ? words.length / sentences.length : words.length;
    const jargonCount = (chunk.match(jargonWords) || []).length;
    const abbrCount = (chunk.match(abbrPattern) || []).length;
    const longSentences = sentences.filter(s => s.split(/\s+/).length > 25).length;
    const hasDefWords = /\b(thus|therefore|hence|it follows|consequently|as such|which means|this implies)\b/i.test(chunk);
    const hasMissingDef = /\b(this|these|such|the above|aforementioned)\b/i.test(chunk) && !/\b(is|are|refers to|means|defined as|known as)\b/i.test(chunk);
    let score = 0;
    score += Math.min(avgWordsPerSent / 30, 1) * 25;
    score += Math.min(jargonCount / 5, 1) * 30;
    score += Math.min(abbrCount / 3, 1) * 20;
    score += longSentences * 10;
    if (hasDefWords) score += 8;
    if (hasMissingDef) score += 12;
    return { idx, chunk, score: Math.round(score), jargonCount, abbrCount, avgWordsPerSent: Math.round(avgWordsPerSent) };
  }).sort((a, b) => b.score - a.score);
}

async function analyzeWithGemini(topChunks, allText) {
  const prompt = `You are an expert study assistant. Analyze these confusing text sections from a student's notes and return a JSON response.

ORIGINAL TEXT CONTEXT:
"""
${allText.slice(0, 500)}
"""

CONFUSING SECTIONS TO ANALYZE:
${topChunks.map((c, i) => `\nSection ${i + 1} (confusion score: ${c.score}):\n"""\n${c.chunk}\n"""`).join("\n")}

Return ONLY valid JSON (no markdown, no backticks) in this exact format:
{
  "sections": [
    {
      "title": "Short descriptive title for this section",
      "why_confusing": "Brief explanation of why students find this confusing (1-2 sentences)",
      "simple_explanation": "Clear, friendly explanation as if for a first-year student (2-4 sentences using analogies)",
      "key_points": ["point 1", "point 2", "point 3"],
      "memory_tip": "One memorable tip or analogy",
      "quiz": [
        { "question": "Quiz question", "options": ["A) option", "B) option", "C) option", "D) option"], "correct": 0 },
        { "question": "Second quiz question", "options": ["A) option", "B) option", "C) option", "D) option"], "correct": 1 }
      ]
    }
  ]
}`;
  const response = await fetch("http://localhost:3001/api/analyze", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await response.json();
  const text = data.text.replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function makeTitle(content) {
  const first = content.trim().split(/[.\n]/)[0].trim();
  return first.length > 55 ? first.slice(0, 55) + "…" : first || "Untitled Document";
}

// ─── Auth Page ─────────────────────────────────────────────────────────────────
function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const reset = () => { setError(""); setSuccess(""); setPassword(""); setConfirmPassword(""); };
  const switchMode = (m) => { setMode(m); reset(); };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    onAuth(data.user);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) { setError("Please fill in all fields."); return; }
    if (password !== confirmPassword) { setError("Passwords don't match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
    setLoading(false);
    if (err) { setError(err.message); return; }
    if (data.user && !data.session) { setSuccess("✓ Check your email to confirm your account."); setMode("login"); }
    else if (data.user) onAuth(data.user);
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email."); return; }
    setLoading(true); setError("");
    const { error: err } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSuccess("✓ Password reset link sent — check your inbox.");
  };

  const handleGoogle = async () => {
    const { error: err } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (err) setError(err.message);
  };

  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  );

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <div className="auth-logo-icon">📖</div>
          <span className="auth-logo-text">Focused Scholar</span>
        </div>
        <div className="auth-tagline">{mode === "forgot" ? "Reset your password" : "Your AI-powered study companion"}</div>

        {mode !== "forgot" && (
          <div className="auth-tabs">
            <button className={`auth-tab${mode === "login" ? " active" : ""}`} onClick={() => switchMode("login")}>Sign In</button>
            <button className={`auth-tab${mode === "signup" ? " active" : ""}`} onClick={() => switchMode("signup")}>Create Account</button>
          </div>
        )}

        {error && <div className="auth-error"><span>⚠️</span><span>{error}</span></div>}
        {success && <div className="auth-success"><span>✅</span><span>{success}</span></div>}

        {mode === "login" && (
          <form onSubmit={handleLogin}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉️</span>
                <input className="auth-input" type="email" placeholder="you@university.edu" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              </div>
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input className="auth-input" type={showPass ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 40 }} />
                <button type="button" className="auth-eye-btn" onClick={() => setShowPass(s => !s)}>{showPass ? "🙈" : "👁️"}</button>
              </div>
            </div>
            <span className="auth-forgot" onClick={() => switchMode("forgot")}>Forgot password?</span>
            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading ? <div className="auth-spinner" /> : null}
              {loading ? "Signing in…" : "Sign In →"}
            </button>
            <div className="auth-divider"><div className="auth-divider-line" /><span className="auth-divider-text">or</span><div className="auth-divider-line" /></div>
            <button type="button" className="auth-google-btn" onClick={handleGoogle}><GoogleIcon />Continue with Google</button>
          </form>
        )}

        {mode === "signup" && (
          <form onSubmit={handleSignup}>
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">👤</span>
                <input className="auth-input" type="text" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
            </div>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉️</span>
                <input className="auth-input" type="email" placeholder="you@university.edu" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input className="auth-input" type={showPass ? "text" : "password"} placeholder="Minimum 6 characters" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 40 }} />
                <button type="button" className="auth-eye-btn" onClick={() => setShowPass(s => !s)}>{showPass ? "🙈" : "👁️"}</button>
              </div>
            </div>
            <div className="auth-field">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input className={`auth-input${confirmPassword && confirmPassword !== password ? " error" : ""}`} type={showPass ? "text" : "password"} placeholder="Repeat your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <button className="auth-submit-btn" type="submit" disabled={loading} style={{ marginTop: 12 }}>
              {loading ? <div className="auth-spinner" /> : null}
              {loading ? "Creating account…" : "Create Account →"}
            </button>
            <div className="auth-divider"><div className="auth-divider-line" /><span className="auth-divider-text">or</span><div className="auth-divider-line" /></div>
            <button type="button" className="auth-google-btn" onClick={handleGoogle}><GoogleIcon />Continue with Google</button>
            <div className="auth-terms">By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a></div>
          </form>
        )}

        {mode === "forgot" && (
          <form onSubmit={handleForgot}>
            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉️</span>
                <input className="auth-input" type="email" placeholder="you@university.edu" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading ? <div className="auth-spinner" /> : null}
              {loading ? "Sending…" : "Send Reset Link →"}
            </button>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <span onClick={() => switchMode("login")} style={{ fontSize: 13, color: ACCENT, cursor: "pointer", fontWeight: 500 }}>← Back to Sign In</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Quiz Component ────────────────────────────────────────────────────────────
function QuizQuestion({ q, qIdx }) {
  const [selected, setSelected] = useState(null);
  const letters = ["A", "B", "C", "D"];
  return (
    <div className="quiz-q">
      <div className="quiz-q-text">{qIdx + 1}. {q.question}</div>
      {q.options.map((opt, i) => {
        let cls = "quiz-option";
        if (selected !== null) {
          if (i === q.correct) cls += " show-answer";
          else if (i === selected && selected !== q.correct) cls += " wrong";
        }
        return (
          <button key={i} className={cls} onClick={() => selected === null && setSelected(i)}>
            <span className="quiz-letter">{letters[i]}</span>
            {opt.replace(/^[A-D]\)\s*/, "")}
          </button>
        );
      })}
      {selected !== null && (
        <div style={{ fontSize: 12, marginTop: 8, color: selected === q.correct ? "#166534" : "#991B1B", fontWeight: 500 }}>
          {selected === q.correct ? "✓ Correct!" : `✗ The answer is ${letters[q.correct]}`}
        </div>
      )}
    </div>
  );
}

// ─── Document Viewer Modal ─────────────────────────────────────────────────────
function DocViewer({ doc, onClose }) {
  const [activeChunk, setActiveChunk] = useState(0);
  const [showAllQuiz, setShowAllQuiz] = useState({});
  const sections = doc.sections || [];
  const scored = doc.scored || [];
  const activeSection = sections[activeChunk];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-title">📄 {doc.title}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="card">
            <div className="card-header">
              <div className="card-icon" style={{ background: "#EEF0FF" }}>📄</div>
              <div className="card-title">Original Text</div>
            </div>
            <div className="extracted-text">{doc.content}</div>
          </div>

          {scored.length > 0 && (
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "#FEF2F2" }}>🔴</div>
                <div className="card-title">Flagged Sections</div>
              </div>
              {scored.slice(0, 3).map((chunk, i) => (
                <div key={i} className="flag-item" style={{ background: i === 0 ? "#FEF2F2" : i === 1 ? "#FFF7ED" : "#F0FDF4", borderLeft: `3px solid ${i === 0 ? "#EF4444" : i === 1 ? "#F97316" : "#22C55E"}` }}>
                  <div className="flag-type" style={{ color: i === 0 ? "#991B1B" : i === 1 ? "#9A3412" : "#166534" }}>
                    {i === 0 ? "⚠ Complex Concept Detected" : i === 1 ? "⚡ Key Examination Topic" : "ℹ Supplemental Context"}
                  </div>
                  <div className="flag-text" style={{ color: i === 0 ? "#7F1D1D" : i === 1 ? "#7C2D12" : "#14532D" }}>
                    {chunk.chunk?.slice(0, 120)}{chunk.chunk?.length > 120 ? "..." : ""}
                  </div>
                </div>
              ))}
            </div>
          )}

          {sections.length > 1 && (
            <div className="chunk-nav">
              {sections.map((_, i) => (
                <button key={i} className={`chunk-tab${activeChunk === i ? " active" : ""}`} onClick={() => setActiveChunk(i)}>
                  Section {i + 1}
                </button>
              ))}
            </div>
          )}

          {activeSection && (
            <>
              <div className="card">
                <div className="card-header">
                  <div className="card-icon" style={{ background: "#F0FDF4" }}>✦</div>
                  <div className="card-title">Simplified Explanation</div>
                </div>
                {activeSection.title && <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>{activeSection.title}</div>}
                {activeSection.why_confusing && <div style={{ fontSize: 12, color: "#8B8FA8", marginBottom: 10, fontStyle: "italic", lineHeight: 1.55 }}>Why confusing: {activeSection.why_confusing}</div>}
                <div className="explanation-text">{activeSection.simple_explanation}</div>
                {activeSection.key_points?.length > 0 && (
                  <ul className="bullet-points">{activeSection.key_points.map((p, i) => <li key={i}>{p}</li>)}</ul>
                )}
                {activeSection.memory_tip && (
                  <div className="memory-tip"><div className="memory-label">💡 Memory Tip</div>{activeSection.memory_tip}</div>
                )}
              </div>
              {activeSection.quiz?.length > 0 && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-icon" style={{ background: "#EEF0FF" }}>❓</div>
                    <div className="card-title">Knowledge Check</div>
                  </div>
                  <QuizQuestion q={activeSection.quiz[0]} qIdx={0} key={`m-${activeChunk}-0`} />
                  {showAllQuiz[activeChunk] && activeSection.quiz.slice(1).map((q, i) => (
                    <QuizQuestion key={`m-${activeChunk}-${i + 1}`} q={q} qIdx={i + 1} />
                  ))}
                  {activeSection.quiz.length > 1 && !showAllQuiz[activeChunk] && (
                    <button className="show-questions-btn" onClick={() => setShowAllQuiz(p => ({ ...p, [activeChunk]: true }))}>
                      Show all {activeSection.quiz.length} questions
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Files Tab ─────────────────────────────────────────────────────────────────
function FilesTab({ userId }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDoc, setViewDoc] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      setDocs(data || []);
      setLoading(false);
    })();
  }, [userId]);

  const handleDelete = async (id) => {
    setDeleting(id);
    await supabase.from("documents").delete().eq("id", id);
    setDocs(prev => prev.filter(d => d.id !== id));
    setDeleting(null);
  };

  if (loading) return <div className="files-loading"><div className="spinner" /></div>;

  if (docs.length === 0) {
    return (
      <div className="files-empty">
        <div className="files-empty-icon">📂</div>
        <div className="files-empty-title">No saved documents</div>
        <div className="files-empty-sub">Analyze a document in the Study tab and it will automatically be saved here for later access.</div>
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <div className="hero-label">Your Library</div>
        <div className="hero-title" style={{ fontSize: 22, marginBottom: 4 }}>Saved Documents</div>
        <div style={{ textAlign: "center", fontSize: 12, color: "#8B8FA8" }}>{docs.length} document{docs.length !== 1 ? "s" : ""} saved</div>
      </div>

      {docs.map(doc => (
        <div key={doc.id} className="file-card">
          <div className="file-card-header">
            <div className="file-card-icon">📄</div>
            <div className="file-card-info">
              <div className="file-card-title">{doc.title}</div>
              <div className="file-card-meta">
                <span>🕐 {formatDate(doc.created_at)}</span>
                <span>·</span>
                <span>{doc.sections?.length || 0} section{doc.sections?.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
          <div className="file-card-preview">{doc.content}</div>
          {doc.sections?.length > 0 && (
            <div className="file-card-tags">
              {doc.sections.slice(0, 3).map((s, i) => (
                <span key={i} className="file-card-tag">{s.title?.slice(0, 24) || `Section ${i + 1}`}</span>
              ))}
            </div>
          )}
          <div className="file-card-actions">
            <button className="file-action-btn" onClick={() => setViewDoc(doc)}>👁️ View Analysis</button>
            <button className="file-action-btn danger" onClick={() => handleDelete(doc.id)} disabled={deleting === doc.id}>
              {deleting === doc.id ? "…" : "🗑️ Delete"}
            </button>
          </div>
        </div>
      ))}

      {viewDoc && <DocViewer doc={viewDoc} onClose={() => setViewDoc(null)} />}
    </>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
function MainApp({ user, onSignOut }) {
  const [activeTab, setActiveTab] = useState("study");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [activeChunk, setActiveChunk] = useState(0);
  const [showAllQuiz, setShowAllQuiz] = useState({});
  const [drag, setDrag] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [toast, setToast] = useState("");
  const fileRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowUserMenu(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const getInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || "FS";
    return name.split(/[\s@]/).map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    if (f.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = e => setText(e.target.result);
      reader.readAsText(f);
    }
  };

  const handleDrop = (e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); };

  const saveDocument = async (content, sections, scored) => {
    try {
      await supabase.from("documents").insert({
        user_id: user.id,
        title: makeTitle(content),
        content: content.slice(0, 5000),
        sections,
        scored,
      });
      showToast("✓ Document saved to Files");
    } catch { /* silent */ }
  };

  const handleAnalyze = async () => {
    const inputText = text.trim();
    if (!inputText && !file) return;
    setLoading(true); setError(null); setResults(null);
    try {
      const contentToAnalyze = inputText || "";
      if (!contentToAnalyze || contentToAnalyze.length < 30) throw new Error("Please paste at least a paragraph of text to analyze.");
      const scored = scoreChunks(contentToAnalyze);
      const top3 = scored.slice(0, Math.min(3, scored.length));
      const aiResult = await analyzeWithGemini(top3, contentToAnalyze);
      setResults({ extractedText: contentToAnalyze, scored, sections: aiResult.sections });
      setActiveChunk(0);
      await saveDocument(contentToAnalyze, aiResult.sections, scored.slice(0, 3));
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const activeSection = results?.sections?.[activeChunk];

  return (
    <div className="app">
      <div className="topbar">
        <span style={{ fontSize: 20 }}>☰</span>
        <span className="topbar-logo">Focused Scholar</span>
        <div style={{ position: "relative" }} ref={menuRef}>
          <div className="topbar-avatar" onClick={() => setShowUserMenu(s => !s)}>{getInitials()}</div>
          {showUserMenu && (
            <div className="user-menu">
              <div className="user-menu-email">{user?.email}</div>
              <button className="user-menu-item">👤 My Profile</button>
              <button className="user-menu-item">⚙️ Settings</button>
              <button className="user-menu-item danger" onClick={onSignOut}>🚪 Sign Out</button>
            </div>
          )}
        </div>
      </div>

      <div className="content">

        {/* ── STUDY TAB ── */}
        {activeTab === "study" && (
          <>
            <div className="hero-label">Knowledge Engine</div>
            <div className="hero-title">Transform your study materials</div>

            <div className={`upload-zone${drag ? " drag" : ""}`} onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={handleDrop}>
              <div className="upload-icon">📄</div>
              <div className="upload-title">Drop PDFs or Images</div>
              <div className="upload-sub">Maximum file size 25MB</div>
              <input ref={fileRef} type="file" accept=".txt,.pdf,.png,.jpg,.jpeg" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
            </div>

            {file && (
              <div className="file-badge">
                <span style={{ fontSize: 20 }}>📎</span>
                <span className="file-badge-name">{file.name}</span>
                <span className="file-badge-remove" onClick={() => setFile(null)}>✕</span>
              </div>
            )}

            <div className="divider-label">or paste text content</div>
            <textarea className="textarea" placeholder="Paste study notes, lecture transcripts, or articles here..." value={text} onChange={e => setText(e.target.value)} rows={5} />

            <button className="analyze-btn" onClick={handleAnalyze} disabled={loading || (!text.trim() && !file)}>
              {loading ? <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Analyzing…</> : <>✦ Analyze Document</>}
            </button>

            {error && <div className="error-card" style={{ marginTop: 16 }}>⚠️ {error}</div>}

            {loading && (
              <>
                <div className="section-label">Analysis Results</div>
                <div className="loading-card"><div className="spinner" /><div className="loading-label">Extracting and scoring content...</div></div>
                <div className="loading-card"><div className="spinner" /><div className="loading-label">Generating explanations...</div></div>
              </>
            )}

            {results && !loading && (
              <>
                <div className="section-label">Analysis Results</div>
                <div className="card">
                  <div className="card-header">
                    <div className="card-icon" style={{ background: "#EEF0FF" }}>📄</div>
                    <div className="card-title">Extracted Text</div>
                    <span style={{ marginLeft: "auto", fontSize: 18, color: "#B0B4CA", cursor: "pointer" }} onClick={() => navigator.clipboard.writeText(results.extractedText)}>⎘</span>
                  </div>
                  <div className="extracted-text">{results.extractedText}</div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-icon" style={{ background: "#FEF2F2" }}>🔴</div>
                    <div className="card-title">Flagged Sections</div>
                  </div>
                  {results.scored.slice(0, 3).map((chunk, i) => (
                    <div key={i} className="flag-item" style={{ background: i === 0 ? "#FEF2F2" : i === 1 ? "#FFF7ED" : "#F0FDF4", borderLeft: `3px solid ${i === 0 ? "#EF4444" : i === 1 ? "#F97316" : "#22C55E"}` }}>
                      <div className="flag-type" style={{ color: i === 0 ? "#991B1B" : i === 1 ? "#9A3412" : "#166534" }}>
                        {i === 0 ? "⚠ Complex Concept Detected" : i === 1 ? "⚡ Key Examination Topic" : "ℹ Supplemental Context"}
                      </div>
                      <div className="flag-text" style={{ color: i === 0 ? "#7F1D1D" : i === 1 ? "#7C2D12" : "#14532D" }}>
                        {chunk.chunk.slice(0, 120)}{chunk.chunk.length > 120 ? "..." : ""}
                      </div>
                      <div className="flag-score" style={{ color: i === 0 ? "#EF4444" : i === 1 ? "#F97316" : "#22C55E" }}>
                        Score: {chunk.score} · {chunk.jargonCount} technical terms · {chunk.abbrCount} abbreviations
                      </div>
                    </div>
                  ))}
                </div>

                {results.sections?.length > 1 && (
                  <div className="chunk-nav">
                    {results.sections.map((_, i) => (
                      <button key={i} className={`chunk-tab${activeChunk === i ? " active" : ""}`} onClick={() => setActiveChunk(i)}>Section {i + 1}</button>
                    ))}
                  </div>
                )}

                {activeSection && (
                  <>
                    <div className="card">
                      <div className="card-header">
                        <div className="card-icon" style={{ background: "#F0FDF4" }}>✦</div>
                        <div className="card-title">Simplified Explanation</div>
                      </div>
                      {activeSection.title && <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>{activeSection.title}</div>}
                      {activeSection.why_confusing && <div style={{ fontSize: 12, color: "#8B8FA8", marginBottom: 10, fontStyle: "italic", lineHeight: 1.55 }}>Why confusing: {activeSection.why_confusing}</div>}
                      <div className="explanation-text">{activeSection.simple_explanation}</div>
                      {activeSection.key_points?.length > 0 && (
                        <ul className="bullet-points">{activeSection.key_points.map((p, i) => <li key={i}>{p}</li>)}</ul>
                      )}
                      {activeSection.memory_tip && (
                        <div className="memory-tip"><div className="memory-label">💡 Memory Tip</div>{activeSection.memory_tip}</div>
                      )}
                    </div>
                    {activeSection.quiz?.length > 0 && (
                      <div className="card">
                        <div className="card-header">
                          <div className="card-icon" style={{ background: "#EEF0FF" }}>❓</div>
                          <div className="card-title">Knowledge Check</div>
                        </div>
                        <QuizQuestion q={activeSection.quiz[0]} qIdx={0} key={`${activeChunk}-0`} />
                        {showAllQuiz[activeChunk] && activeSection.quiz.slice(1).map((q, i) => (
                          <QuizQuestion key={`${activeChunk}-${i + 1}`} q={q} qIdx={i + 1} />
                        ))}
                        {activeSection.quiz.length > 1 && !showAllQuiz[activeChunk] && (
                          <button className="show-questions-btn" onClick={() => setShowAllQuiz(p => ({ ...p, [activeChunk]: true }))}>
                            Show all {activeSection.quiz.length} questions
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* ── FILES TAB ── */}
        {activeTab === "files" && <FilesTab userId={user.id} />}

        {/* ── INSIGHTS TAB ── */}
        {activeTab === "insights" && (
          <div className="files-empty">
            <div className="files-empty-icon">💡</div>
            <div className="files-empty-title">Insights coming soon</div>
            <div className="files-empty-sub">Track your study patterns, most confused topics, and quiz scores over time.</div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bottomnav">
        <div className={`nav-item${activeTab === "study" ? " active" : ""}`} onClick={() => setActiveTab("study")}>
          <span className="nav-icon">📖</span>Study
        </div>
        <div className={`nav-item${activeTab === "files" ? " active" : ""}`} onClick={() => setActiveTab("files")}>
          <span className="nav-icon">📁</span>Files
        </div>
        <div className={`nav-item${activeTab === "insights" ? " active" : ""}`} onClick={() => setActiveTab("insights")}>
          <span className="nav-icon">💡</span>Insights
        </div>
      </div>

      {toast && <div className="save-toast">{toast}</div>}
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => { await supabase.auth.signOut(); setUser(null); };

  if (authLoading) {
    return (
      <>
        <style>{styles}</style>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F7F8FC" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_MID})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📖</div>
            <div style={{ width: 36, height: 36, border: `3px solid ${ACCENT_LIGHT}`, borderTopColor: ACCENT, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      {user ? <MainApp user={user} onSignOut={handleSignOut} /> : <AuthPage onAuth={setUser} />}
    </>
  );
}