export type CheckBoxProps = Readonly<{
  isActive: boolean
  label: string
  onPressCheckBox: (state: boolean) => void
}>