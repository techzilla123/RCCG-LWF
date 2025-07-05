// Google Identity Services API Types
export interface GoogleCredentialResponse {
  credential: string
  select_by?: string
}

export interface GoogleButtonConfig {
  theme?: "outline" | "filled_blue" | "filled_black"
  size?: "large" | "medium" | "small"
  width?: string | number
  text?: "signin_with" | "signup_with" | "continue_with" | "signin"
  shape?: "rectangular" | "pill" | "circle" | "square"
}

export interface GoogleIdConfiguration {
  client_id: string
  callback: (response: GoogleCredentialResponse) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
}

export interface GoogleAccounts {
  id: {
    initialize: (config: GoogleIdConfiguration) => void
    renderButton: (element: HTMLElement, config: GoogleButtonConfig) => void
  }
}

// Global Window interface extension
declare global {
  interface Window {
    google?: {
      accounts: GoogleAccounts
    }
  }
}
