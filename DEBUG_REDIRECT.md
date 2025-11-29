# Debug Redirect Loop Issue

## Steps to Debug

1. **Clear all cookies for localhost**
   - Open browser DevTools (F12)
   - Go to Application/Storage → Cookies
   - Delete all cookies for `localhost`

2. **Check if cookie is being set:**
   ```bash
   curl -v http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"hs230998@gmail.com","password":"admin123"}' \
     -c cookies.txt
   ```
   Check the `cookies.txt` file to see if `admin_token` is set.

3. **Check authentication status:**
   ```bash
   curl http://localhost:3000/api/auth/debug \
     -b cookies.txt
   ```

4. **Check middleware behavior:**
   - Open browser DevTools → Network tab
   - Try to access `/admin`
   - Check the response headers and redirect chain

## Common Issues

1. **JWT_SECRET mismatch**: Make sure `.env` has the same JWT_SECRET everywhere
2. **Cookie not being set**: Check if cookie is in response headers
3. **Cookie path issue**: Cookie should have `path=/`
4. **Middleware running before cookie**: The redirect happens too fast

## Quick Fix

If still having issues, try:
1. Clear browser cache and cookies completely
2. Restart the dev server: `npm run dev`
3. Login again
4. Check browser console for errors

