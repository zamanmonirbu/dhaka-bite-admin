import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  _id: string
  name: string
  email: string
  role: string
  phone?: string
  profileImage?: string
  area?: string
  address?: string
  balance?: number
  isVerified?: boolean
  referenceCode?: string
  subscription?: string
  hasActiveSubscription?: boolean
  isMealActive?: boolean
}

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Load initial state from localStorage if available
const loadFromStorage = (): AuthState => {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("token")
      const user = localStorage.getItem("user")
      const refreshToken = localStorage.getItem("refreshToken")

      if (token && user) {
        return {
          user: JSON.parse(user),
          token,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }
      }
    } catch (error) {
      console.error("Error loading auth state from localStorage:", error)
    }
  }

  return {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
  }
}

const initialState: AuthState = loadFromStorage()

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User
        accessToken: string
        refreshToken?: string
      }>,
    ) => {
      const { user, accessToken, refreshToken } = action.payload
      state.user = user
      state.token = accessToken
      state.refreshToken = refreshToken || null
      state.isAuthenticated = true
      state.isLoading = false

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", accessToken)
        localStorage.setItem("user", JSON.stringify(user))
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken)
        }
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.isLoading = false

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("refreshToken")
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setCredentials, logout, setLoading } = authSlice.actions
export default authSlice.reducer
