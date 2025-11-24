const API_BASE_URL = import.meta.env.VITE_API_URL || ''

export interface LettersResponse {
  letters: string[]
}

export interface BlendRequest {
  consonant: string
  vowel: string
}

export interface BlendResponse {
  consonant: string
  vowel: string
  syllable: string
  audio_url: string
}

export interface HealthResponse {
  status: string
  message: string
  version: string
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new ApiError(response.status, errorText)
  }
  
  return response.json()
}

export async function fetchConsonants(): Promise<LettersResponse> {
  const response = await fetch(`${API_BASE_URL}/api/phonics/consonants`)
  return handleResponse<LettersResponse>(response)
}

export async function fetchVowels(): Promise<LettersResponse> {
  const response = await fetch(`${API_BASE_URL}/api/phonics/vowels`)
  return handleResponse<LettersResponse>(response)
}

export async function blendSyllable(
  consonant: string,
  vowel: string
): Promise<BlendResponse> {
  const response = await fetch(`${API_BASE_URL}/api/phonics/blend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ consonant, vowel }),
  })
  return handleResponse<BlendResponse>(response)
}

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/health`)
  return handleResponse<HealthResponse>(response)
}

export async function preloadAudio(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url)
    audio.preload = 'auto'
    
    audio.addEventListener('canplaythrough', () => resolve(), { once: true })
    audio.addEventListener('error', () => reject(new Error('Failed to load audio')), { once: true })
    
    audio.load()
  })
}