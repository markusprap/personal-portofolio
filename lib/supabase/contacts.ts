import { supabase } from './client'
import { Contact } from './types'

export async function createContact(contact: Omit<Contact, 'id' | 'created_at' | 'status'>): Promise<Contact | null> {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{ 
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      status: 'unread' as const 
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating contact:', error)
    return null
  }

  return data
}

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contacts:', error)
    return []
  }

  return data || []
}

export async function updateContactStatus(id: string, status: Contact['status']): Promise<Contact | null> {
  const { data, error } = await supabase
    .from('contacts')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating contact status:', error)
    return null
  }

  return data
}