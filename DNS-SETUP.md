# DNS Setup Guide for motionmetrics.de with Squarespace

## Current Squarespace DNS Records (TO BE REPLACED)

These are Squarespace's default records that you need to **DELETE** or **REPLACE**:

```
Host    Type    Priority  TTL      Data
@       A       0         4 Std.   198.185.159.144
@       A       0         4 Std.   198.49.23.145
@       A       0         4 Std.   198.49.23.144
@       A       0         4 Std.   198.185.159.145
www     CNAME   0         4 Std.   ext-sq.squarespace.com
@       HTTPS   0         4 Std.   (Squarespace config)
```

## New DNS Records for GitHub Pages

### Step 1: Remove/Replace A Records

**Delete** the 4 existing A records pointing to Squarespace IPs (198.185.159.x and 198.49.23.x)

**Add** these 4 new A records pointing to GitHub Pages:

**IMPORTANT for Squarespace**: Leave the "Host" field **BLANK** or **EMPTY** (NOT @) for root domain records!

```
Record 1:
Host: (leave blank/empty)
Type: A
TTL: 3600 (or keep default)
Data/Value: 185.199.108.153

Record 2:
Host: (leave blank/empty)
Type: A
TTL: 3600
Data/Value: 185.199.109.153

Record 3:
Host: (leave blank/empty)
Type: A
TTL: 3600
Data/Value: 185.199.110.153

Record 4:
Host: (leave blank/empty)
Type: A
TTL: 3600
Data/Value: 185.199.111.153
```

### Step 2: Update CNAME Record

**Replace** the existing www CNAME record:

```
Host: www
Type: CNAME
TTL: 3600 (or keep default)
Data/Value: motionmetricslab.github.io
```

**Change from:** `ext-sq.squarespace.com`
**Change to:** `motionmetricslab.github.io`

### Step 3: Handle HTTPS Record (Optional)

You can **delete** the HTTPS record (the one with alpn="h2,http/1.1"). GitHub Pages will handle HTTPS automatically once DNS propagates.

## Squarespace DNS Management Steps

1. **Log in to Squarespace**: https://account.squarespace.com/
2. **Go to Domains**: Click on your domain `motionmetrics.de`
3. **Access DNS Settings**: Look for "DNS Settings" or "Advanced DNS" or "Custom Records"
4. **Edit/Delete A Records**:
   - Find the 4 A records pointing to `198.x.x.x` IPs
   - Either delete them and add new ones, or edit them to use the GitHub IPs listed above
5. **Edit CNAME Record**:
   - Find the `www` CNAME record
   - Change the target from `ext-sq.squarespace.com` to `motionmetricslab.github.io`
6. **Save Changes**

## After DNS Changes

### 1. Wait for DNS Propagation
- Can take 5 minutes to 48 hours (usually < 1 hour)
- Check status: https://dnschecker.org/#A/motionmetrics.de

### 2. Configure GitHub Pages
1. Go to: https://github.com/MotionMetricsLab/website-2025/settings/pages
2. Under "Custom domain", enter: `motionmetrics.de`
3. Click **Save**
4. Wait for DNS check to complete (green checkmark)
5. Check **Enforce HTTPS** (may need to wait a few minutes for certificate)

### 3. Deploy Your Site
Make sure your changes are committed and pushed:

```powershell
git add .
git commit -m "Configure custom domain motionmetrics.de"
git push origin main
```

## Verification Commands

Check if DNS is pointing to GitHub Pages:

```powershell
# Check A records
nslookup motionmetrics.de

# Should return IPs starting with 185.199.x.x

# Check CNAME for www
nslookup www.motionmetrics.de

# Should return motionmetricslab.github.io
```

## Expected Results

- ✅ `motionmetrics.de` → loads your GitHub Pages site
- ✅ `www.motionmetrics.de` → redirects to `motionmetrics.de`
- ✅ HTTPS works automatically
- ✅ Images display correctly (we already fixed the paths)

## Troubleshooting

**Problem**: "Domain does not resolve to the GitHub Pages server"
- **Solution**: Wait longer for DNS propagation, or verify A records are correct

**Problem**: Certificate error or not secure warning
- **Solution**: Wait for GitHub to provision SSL certificate (5-10 minutes after DNS verification)

**Problem**: 404 error
- **Solution**: Make sure CNAME file is in `public/` folder and you've set custom domain in GitHub Pages settings

**Problem**: Site works but images missing
- **Solution**: Already fixed! We updated image paths to be relative in the previous changes

## Important Notes

- The CNAME file in `public/CNAME` must contain only: `motionmetrics.de`
- The `astro.config.mjs` must have `site: 'https://motionmetrics.de'`
- No `base` path should be set when using a custom domain
- All these are already configured in your repository!
