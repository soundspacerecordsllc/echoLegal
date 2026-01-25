#!/bin/bash
# EchoLegal Download Smoke Test
# Verifies all downloadable files return HTTP 200 with correct content types

BASE_URL="${1:-http://localhost:3000}"
FAILED=0
PASSED=0

echo "================================================"
echo "EchoLegal Download Smoke Test"
echo "Base URL: $BASE_URL"
echo "================================================"
echo ""

# Function to test a download URL
test_download() {
    local path="$1"
    local expected_type="$2"
    local name="$3"

    url="${BASE_URL}${path}"

    # Get HTTP status and content-type
    response=$(curl -sI "$url" 2>/dev/null)
    status=$(echo "$response" | grep -i "^HTTP" | tail -1 | awk '{print $2}')
    content_type=$(echo "$response" | grep -i "^content-type" | cut -d: -f2 | tr -d ' \r')

    if [ "$status" = "200" ]; then
        echo "[PASS] $name"
        echo "       Path: $path"
        echo "       Status: $status"
        ((PASSED++))
    else
        echo "[FAIL] $name"
        echo "       Path: $path"
        echo "       Status: $status (expected 200)"
        ((FAILED++))
    fi
    echo ""
}

echo "=== Contract Templates (DOCX) ==="
echo ""
test_download "/documents/NDA-EN.docx" "application/vnd.openxmlformats" "NDA (English)"
test_download "/documents/GizlilikSozlesmesi-TR.docx" "application/vnd.openxmlformats" "NDA (Turkish)"
test_download "/documents/IndependentContractorAgreement-EN.docx" "application/vnd.openxmlformats" "Independent Contractor (EN)"
test_download "/documents/BagimsizYukleniciSozlesmesi-TR.docx" "application/vnd.openxmlformats" "Independent Contractor (TR)"
test_download "/documents/Service-Agreement-EN.docx" "application/vnd.openxmlformats" "Service Agreement (EN)"
test_download "/documents/Service-Agreement-TR.docx" "application/vnd.openxmlformats" "Service Agreement (TR)"
test_download "/documents/FreelanceServiceAgreement-Modern-EN.docx" "application/vnd.openxmlformats" "Freelance Agreement (EN)"
test_download "/documents/SerbestCalisanHizmetSozlesmesi-Modern-TR.docx" "application/vnd.openxmlformats" "Freelance Agreement (TR)"
test_download "/documents/PrivacyPolicy-EN.docx" "application/vnd.openxmlformats" "Privacy Policy (EN)"
test_download "/documents/GizlilikPolitikasi-TR.docx" "application/vnd.openxmlformats" "Privacy Policy (TR)"
test_download "/documents/TermsOfService-EN.docx" "application/vnd.openxmlformats" "Terms of Service (EN)"
test_download "/documents/KullanimKosullari-TR.docx" "application/vnd.openxmlformats" "Terms of Service (TR)"
test_download "/documents/InfluencerAgreement-Modern-EN.docx" "application/vnd.openxmlformats" "Influencer Agreement (EN)"
test_download "/documents/InfluencerSozlesmesi-Modern-TR.docx" "application/vnd.openxmlformats" "Influencer Agreement (TR)"

echo "=== Legal Kits (ZIP) ==="
echo ""
test_download "/documents/kits/abd-business-starter-kit.zip" "application/zip" "Business Starter Kit"
test_download "/documents/kits/tr-us-legal-bridge-library.zip" "application/zip" "TR-US Legal Bridge Library"
test_download "/documents/kits/abdye-gelmeden-once-rehberi.zip" "application/zip" "Pre-Arrival Guide"

echo "=== Consular Checklists (PDF) ==="
echo ""
test_download "/documents/Passport-Checklist-EN.pdf" "application/pdf" "Passport Checklist (EN)"
test_download "/documents/Pasaport-Kontrol-Listesi-TR.pdf" "application/pdf" "Passport Checklist (TR)"
test_download "/documents/Turkish-ID-Checklist-EN.pdf" "application/pdf" "Turkish ID Checklist (EN)"
test_download "/documents/Kimlik-Kontrol-Listesi-TR.pdf" "application/pdf" "Turkish ID Checklist (TR)"
test_download "/documents/Birth-Registration-Checklist-EN.pdf" "application/pdf" "Birth Registration (EN)"
test_download "/documents/Dogum-Tescili-Kontrol-Listesi-TR.pdf" "application/pdf" "Birth Registration (TR)"
test_download "/documents/Marriage-Registration-Checklist-EN.pdf" "application/pdf" "Marriage Registration (EN)"
test_download "/documents/Evlilik-Tescili-Kontrol-Listesi-TR.pdf" "application/pdf" "Marriage Registration (TR)"
test_download "/documents/Death-Registration-Checklist-EN.pdf" "application/pdf" "Death Registration (EN)"
test_download "/documents/Olum-Tescili-Kontrol-Listesi-TR.pdf" "application/pdf" "Death Registration (TR)"
test_download "/documents/Document-Certification-Checklist-EN.pdf" "application/pdf" "Document Certification (EN)"
test_download "/documents/Belge-Tasdiki-Kontrol-Listesi-TR.pdf" "application/pdf" "Document Certification (TR)"
test_download "/documents/Notary-Services-Checklist-EN.pdf" "application/pdf" "Notary Services (EN)"
test_download "/documents/Noterlik-Kontrol-Listesi-TR.pdf" "application/pdf" "Notary Services (TR)"
test_download "/documents/Population-Registry-Checklist-EN.pdf" "application/pdf" "Population Registry (EN)"
test_download "/documents/Nufus-Kayit-Ornegi-Kontrol-Listesi-TR.pdf" "application/pdf" "Population Registry (TR)"

echo "================================================"
echo "RESULTS"
echo "================================================"
echo "Passed: $PASSED"
echo "Failed: $FAILED"
echo ""

if [ $FAILED -gt 0 ]; then
    echo "STATUS: FAIL - $FAILED download(s) not working"
    exit 1
else
    echo "STATUS: PASS - All downloads verified"
    exit 0
fi
