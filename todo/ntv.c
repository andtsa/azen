
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>



struct Board
{
  char playfield[3][3];
  int turn;
};

signed int objectiveFunction(struct Board * board)
{
 return 0;  
}

int findBestMove(struct Board *board)
{
    return 0;
}

struct Image
{
    unsigned char *pixels;
    unsigned int width;
    unsigned int height;
    unsigned int channels;
    unsigned int bitsperpixel;
    unsigned int image_size;
    unsigned long timestamp;
};

unsigned int simplePowCodecs(unsigned int base, unsigned int exp)
{
    if (exp == 0)
        return 1;
    unsigned int retres = base;
    unsigned int i = 0;
    for (i = 0; i < exp - 1; i++)
    {
        retres *= base;
    }
    return retres;
}

int WritePPM(char * filename,struct Image * pic)
{
    //fprintf(stderr,"saveRawImageToFile(%s) called\n",filename);
    if (pic==0) { return 0; }
    if ( (pic->width==0) || (pic->height==0) || (pic->channels==0) || (pic->bitsperpixel==0) )
        {
        fprintf(stderr,"saveRawImageToFile(%s) called with zero dimensions ( %ux%u %u channels %u bpp\n",filename,pic->width , pic->height,pic->channels,pic->bitsperpixel);
        return 0;
        }
    if(pic->pixels==0) { fprintf(stderr,"saveRawImageToFile(%s) called for an unallocated (empty) frame , will not write any file output\n",filename); return 0; }
    if (pic->bitsperpixel>16) { fprintf(stderr,"PNM does not support more than 2 bytes per pixel..!\n"); return 0; }

    FILE *fd=0;
    fd = fopen(filename,"wb");

    if (fd!=0)
    {
        unsigned int n;
        if (pic->channels==3) fprintf(fd, "P6\n");
        else if (pic->channels==1) fprintf(fd, "P5\n");
        else
        {
            fprintf(stderr,"Invalid channels arg (%u) for SaveRawImageToFile\n",pic->channels);
            fclose(fd);
            return 1;
        }

        fprintf(fd, "%d %d\n%u\n", pic->width, pic->height , simplePowCodecs(2 ,pic->bitsperpixel)-1);

        float tmp_n = (float) pic->bitsperpixel/ 8;
        tmp_n = tmp_n *  pic->width * pic->height * pic->channels ;
        n = (unsigned int) tmp_n;

        fwrite(pic->pixels, 1 , n , fd);
        fflush(fd);
        fclose(fd);
        return 1;
    }
    else
    {
        fprintf(stderr,"SaveRawImageToFile could not open output file %s\n",filename);
        return 0;
    }
    return 0;
}

void background(struct Image * img)
{
    unsigned int x,y;
    for (y=0; y<img->height; y++)
    {
        for (x=0; x<img->width; x++)
        {
            //RGB
            img->pixels[y*img->width*3 + x*3 + 0] = 0; //R
            img->pixels[y*img->width*3 + x*3 + 1] = 0; //G
            float colorValue = 255 * y / img->height;
            img->pixels[y*img->width*3 + x*3 + 2] = (char) colorValue; //B
        }
    }
}


void setPixel(struct Image * img,unsigned int x,unsigned int y,char R,char G,char B)
{
   img->pixels[y*img->width*3 + x*3 + 0] = R; //R
   img->pixels[y*img->width*3 + x*3 + 1] = G; //G 
   img->pixels[y*img->width*3 + x*3 + 2] = B; //B 
}

void clear(struct Image *img, char r, char g, char b)
{
    unsigned int x, y;
    for (y = 0; y < img->height; y++)
    {
        for (x = 0; x < img->width; x++)
        {
            //RGB
            img->pixels[y * img->width * 3 + x * 3 + 0] = r; //R
            img->pixels[y * img->width * 3 + x * 3 + 1] = g; //G
            img->pixels[y * img->width * 3 + x * 3 + 2] = b; //B
        }
    }
}

void verticalLine(struct Image * img,unsigned int x,char R,char G,char B)
{
    for (int y = 0; y < 300; y++)
    {
        setPixel(img, x, y, R, G, B);
    }
}

int main(int argc, char *argv[])
{
    struct Board ourBoard={0};
    fprintf(stderr,"It works!\n");  
    exit (0);


    struct Image pic = {0};
    pic.width = 300;
    pic.height = 300;
    pic.channels = 3;
    pic.image_size = pic.width * pic.height * pic.channels;
    pic.bitsperpixel = 8;
    pic.pixels = (unsigned char *)malloc(sizeof(char) * pic.image_size);
    background(&pic);

    verticalLine(&pic, 100, 255, 255, 0);
    verticalLine(&pic, 200, 255, 255, 0);

    WritePPM("game.pnm", &pic);
    int i = system("/usr/local/Cellar/imagemagick/7.0.8-35/bin/convert game.pnm data/games/ttt/move.png");
}