import { supabase } from "@/app/lib/supabase"

async function uploadFile(file: File, folder: string) {
  const { data, error } = await supabase.storage
    .from("seu-bucket")
    .upload(`${folder}/${file.name}`, file)

  if (error) throw error
  return data
}
