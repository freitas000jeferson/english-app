-- CreateTable
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "en" TEXT NOT NULL,
    "pt" TEXT NOT NULL,
    "description" TEXT,
    "dictionary" JSONB,
    "isAbstract" BOOLEAN NOT NULL DEFAULT false,
    "partOfSpeech" TEXT,
    "imageUrl" TEXT,
    "imageTried" BOOLEAN NOT NULL DEFAULT false,
    "gifUrl" TEXT,
    "gifTried" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Word_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Example" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wordId" INTEGER NOT NULL,
    "affirmativeEn" TEXT NOT NULL,
    "affirmativePt" TEXT NOT NULL,
    "negativeEn" TEXT NOT NULL,
    "negativePt" TEXT NOT NULL,
    "interrogativeEn" TEXT NOT NULL,
    "interrogativePt" TEXT NOT NULL,
    CONSTRAINT "Example_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wordId" INTEGER NOT NULL,
    "interval" INTEGER NOT NULL,
    "easeFactor" REAL NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "nextReviewAt" DATETIME NOT NULL,
    "lastGrade" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_en_key" ON "Word"("en");

-- CreateIndex
CREATE INDEX "Word_categoryId_idx" ON "Word"("categoryId");

-- CreateIndex
CREATE INDEX "Word_isAbstract_idx" ON "Word"("isAbstract");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Review_wordId_key" ON "Review"("wordId");
