type ModalType = 'details' | 'form' | 'none'

export interface Modal {
  type: ModalType,
  id?: number
}