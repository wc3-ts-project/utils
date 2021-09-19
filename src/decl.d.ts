type integer = number
type real = number
type Primitive = boolean | integer | real | string
type rawcode = integer | string
type order = rawcode

type code = () => void
type codeboolexpr = () => boolean