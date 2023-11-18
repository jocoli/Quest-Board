import { createClient } from '@supabase/supabase-js'

const URL = 'https://nntkaffuascyshmlfbzm.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5udGthZmZ1YXNjeXNobWxmYnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyNzY4MjYsImV4cCI6MjAxNTg1MjgyNn0.A0bhmuOHTtXGZQzLGmrUoNbX5C2ehzyM5DJ6z3Tnvw4';

export const supabase = createClient(URL, API_KEY);
