import { Dialog as DialogPrimitive } from 'bits-ui'

const Root = DialogPrimitive.Root
const Trigger = DialogPrimitive.Trigger
const Portal = DialogPrimitive.Portal

import Title from './dialog-title.svelte'
import Footer from './dialog-footer.svelte'
import Header from './dialog-header.svelte'
import Overlay from './dialog-overlay.svelte'
import Content from './dialog-content.svelte'
import Description from './dialog-description.svelte'

export {
  Root,
  Portal,
  Title,
  Footer,
  Header,
  Trigger,
  Overlay,
  Content,
  Description,
  //
  Root as Dialog,
  Portal as DialogPortal,
  Title as DialogTitle,
  Footer as DialogFooter,
  Header as DialogHeader,
  Trigger as DialogTrigger,
  Overlay as DialogOverlay,
  Content as DialogContent,
  Description as DialogDescription
}
