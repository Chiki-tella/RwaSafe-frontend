export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface Sector {
  id: number;
  name: string;
  province: string;
  slope_factor: number;
  population_estimate: number;
  current_risk_level: RiskLevel;
  current_risk_score: number;
  last_updated: string;
}

export interface EnvironmentalData {
  id: number;
  sector_id: number;
  rainfall_mm: number;
  soil_moisture_percent: number;
  displacement_score: number;
  vegetation_index: number;
  slope_factor: number;
  confidence_score: number;
  timestamp: string;
}

export interface Alert {
  id: number;
  sector_id: number;
  risk_level: RiskLevel;
  message_en: string;
  message_rw: string;
  explanation: string;
  timestamp: string;
  status: string;
  sector?: Sector;
}

export interface SMSLog {
  id: number;
  alert_id: number;
  recipient: string;
  provider: string;
  message: string;
  status: "SENT" | "FAILED" | "RETRYING";
  retry_count: number;
  timestamp: string;
}

export interface DashboardStats {
  total_sectors: number;
  active_alerts: number;
  critical_sectors: number;
  sms_sent: number;
  system_uptime_seconds: number;
  average_rainfall: number;
  average_risk_score: number;
}

export interface SystemHealth {
  status: string;
  database: string;
  simulation_engine: string;
  alert_system: string;
  timestamp: string;
}
